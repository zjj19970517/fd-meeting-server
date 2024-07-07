import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { OverrideNames } from 'src/constants/override-names';
import { Permission } from 'src/modules/user/entities/permission.entity';

export interface JwtUserData {
  userId: number;
  username: string;
  roles: string[];
  permissions: Permission[];
}

declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;

  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    // 用 reflector 从目标 controller 和 handler 上拿到 need-login 的 metadata
    const requireLogin = this.reflector.getAllAndOverride(
      OverrideNames.NEED_LOGIN,
      [context.getClass(), context.getHandler()],
    );
    // 如果没有 metadata，就是不需要登录，返回 true 放行
    if (!requireLogin) {
      return true;
    }
    // 从 authorization 的 header 取出 jwt 来
    const authorization = request.headers.authorization;
    if (!authorization) {
      // 如果不存在鉴权 token，返回 401 响应
      throw new UnauthorizedException('用户未登录');
    }
    try {
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify<JwtUserData>(token);
      request.user = {
        userId: data.userId,
        username: data.username,
        roles: data.roles,
        permissions: data.permissions,
      };
      return true;
    } catch (e) {
      // 如果 jwt 无效，返回 401 响应
      throw new UnauthorizedException('token 失效，请重新登录');
    }
  }
}
