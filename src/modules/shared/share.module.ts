import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// providers
import { EmailProviders } from '../../common/providers/email.providers';
import { DataBaseProviders } from '../../common/providers/database.providers';
// services
import { JWTHelperService } from '../../common/services/jwt-helper.service';
import { RedisHelperService } from '../../common/services/redis-helper.service';
import { EmailHelperService } from '../../common/services/email-helper.service';

// 共享模块
@Module({
  imports: [
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
