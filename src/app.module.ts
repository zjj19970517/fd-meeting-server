import { Module } from '@nestjs/common';

// modules
import { SharedModule } from './shared/share.module';
import { UserModule } from './modules/user/user.module';
// providers
import { GuardProviders } from './shared/providers/guard.providers';
import { InterceptorProviders } from './shared/providers/interceptor.providers';
// controllers
import { AppController } from './app.controller';
// services
import { AppService } from './app.service';

@Module({
  imports: [
    // 注册应用所需的全部模块
    // 共享模块
    SharedModule,
    // 用户模块
    UserModule,
    // ... 其他模块
  ],
  controllers: [AppController],
  providers: [
    // 根应用 Service
    AppService,
    // 全局守卫
    ...GuardProviders,
    // 全局拦截器
    ...InterceptorProviders,
  ],
})
export class AppModule {}
