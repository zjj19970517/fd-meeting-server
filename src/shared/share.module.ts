import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { configModuleOptions } from './config/module-options';

// providers
import { EmailProviders } from './providers/email.providers';
import { DataBaseProviders } from './providers/database.providers';

// services
import { JWTHelperService } from './services/jwt-helper.service';
import { RedisHelperService } from './services/redis-helper.service';
import { EmailHelperService } from './services/email-helper.service';

// 共享模块
@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot(configModuleOptions),
    // JWT 模块
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get<string>('jwt.secret'),
          signOptions: {
            expiresIn: '30m',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [
    // 数据库连接
    ...DataBaseProviders,
    // 初始化游戏客户端
    ...EmailProviders,
    // jwt helper
    JWTHelperService,
    // redis helper
    RedisHelperService,
    // email helper
    EmailHelperService,
  ],
  providers: [
    ConfigService,
    ...DataBaseProviders,
    ...EmailProviders,
    RedisHelperService,
    EmailHelperService,
    JWTHelperService,
  ],
})
export class SharedModule {}
