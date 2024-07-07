import { Request } from 'express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * 获取登录的用户信息
 */
export const GetLoginUserInfo = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    if (!request.user) {
      return null;
    }
    return key ? request.user[key] : request.user;
  },
);
