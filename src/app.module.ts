import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AppService } from './app.service';

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
  providers: [AppService],
})
export class AppModule {}
