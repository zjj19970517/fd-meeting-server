import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { GuardProviders } from './shared/providers/guard.providers';
import { InterceptorProviders } from './shared/providers/interceptor.providers';

import { SharedModule } from './shared/share.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    // 共享模块
    SharedModule,
    // 用户模块
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...GuardProviders, ...InterceptorProviders],
})
export class AppModule {}
