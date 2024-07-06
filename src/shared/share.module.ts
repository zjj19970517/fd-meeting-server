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
    // 建连邮箱客户端
    ...EmailProviders,

    // Redis Helper
    RedisHelperService,
    // Email Helper
    EmailHelperService,
    // JWT Helper
    JWTHelperService,
  ],
  providers: [
    // 数据库连接
    ...DataBaseProviders,
    // 建连邮箱客户端
    ...EmailProviders,

    // Redis Helper
    RedisHelperService,
    // Email Helper
    EmailHelperService,
    // JWT Helper
    JWTHelperService,
  ],
})
export class SharedModule {}
