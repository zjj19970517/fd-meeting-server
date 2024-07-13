import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './entities';
// modules
// import { UserModule } from './modules/user/user.module';
// providers
import { GuardProviders } from './common/providers/guard.providers';
import { InterceptorProviders } from './common/providers/interceptor.providers';
// controllers
import { AppController } from './app.controller';
// services
import { AppService } from './app.service';
import { TestModule } from './modules/test/test.module';
import { configModuleOptions } from './common/config/module-options';
import { WinstonOptions } from './common/logger/logger.options';

@Module({
  imports: [
    // 配置中心（全局）
    ConfigModule.forRoot(configModuleOptions),
    // 日志模块（全局）
    WinstonModule.forRoot(WinstonOptions),
    // TypeORM MySQL 模块（全局）
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('mysql.host'),
        port: configService.get<number>('mysql.port'),
        username: configService.get<string>('mysql.username'),
        password: configService.get<string>('mysql.password'),
        database: configService.get<string>('mysql.database'),
        synchronize: configService.get<boolean>('mysql.synchronize'),
        logging: configService.get<boolean>('mysql.logging'),
        entities,
        poolSize: configService.get<number>('mysql.poolSize'),
        connectorPackage: configService.get<'mysql' | 'mysql2'>(
          'mysql.connectorPackage',
        ),
        extra: {
          authPlugin: 'sha256_password',
        },
      }),
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
