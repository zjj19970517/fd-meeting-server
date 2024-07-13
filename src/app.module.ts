import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';

// modules
// import { UserModule } from './modules/user/user.module';
import { TestModule } from '@modules/test/test.module';
// providers
import { GuardProviders } from '@common/providers/guard.providers';
import { InterceptorProviders } from '@common/providers/interceptor.providers';
// controllers
import { AppController } from '@/app.controller';
// services
import { AppService } from '@/app.service';
// options
import { WinstonOptions } from '@common/logger/logger.options';
import { configModuleOptions } from '@common/config/module-options';
import { createTypeOrmOptions } from '@common/db/mysql/mysql.options';
import { createIoredisOptions } from '@common/db/redis/redis.options';

@Module({
  imports: [
    // 配置中心（全局）
    ConfigModule.forRoot(configModuleOptions),

    // 日志模块（全局）
    WinstonModule.forRoot(WinstonOptions),

    // TypeORM MySQL 模块（全局）
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        createTypeOrmOptions(configService),
      inject: [ConfigService],
    }),

    // Redis 模块（全局）
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        createIoredisOptions(configService),
      inject: [ConfigService],
    }),

    // 业务模块
    TestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局守卫
    ...GuardProviders,

    // 全局拦截器
    ...InterceptorProviders,
  ],
})
export class AppModule {}
