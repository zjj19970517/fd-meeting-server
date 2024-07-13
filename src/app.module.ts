import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';

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
    // 日志模块
    WinstonModule.forRoot(WinstonOptions),
    // 用户模块
    // UserModule,
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
