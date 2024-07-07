import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { LoginUserVo } from 'src/modules/user/vo/login-user.vo';

@Injectable()
export class JWTHelperService {
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  /**
   * 生成鉴权 token
   * @param userVo
   */
  genAccessToken(userVo: LoginUserVo) {
    return this.jwtService.sign(
      {
        userId: userVo.userInfo.id,
        username: userVo.userInfo.username,
        roles: userVo.userInfo.roles,
        permissions: userVo.userInfo.permissions,
      },
      {
        expiresIn:
          this.configService.get<string>('jwt.accessTokenExpiresTime') || '30m',
      },
    );
  }

  /**
   * 生成刷新 token
   * @param userVo
   */
  genRefreshToken(userVo: LoginUserVo) {
    return this.jwtService.sign(
      {
        userId: userVo.userInfo.id,
      },
      {
        expiresIn:
          this.configService.get<string>('jwt.refreshTokenExpiresTime') || '7d',
      },
    );
  }
}
