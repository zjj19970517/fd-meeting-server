import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

import {
  NeedLogin,
  NeedPermissions,
  GetLoginUserInfo,
} from './shared/decorators/custom.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('aaa')
  @NeedLogin()
  testLoginGuard(@GetLoginUserInfo('userId') userId: number) {
    return userId;
  }

  @Get('bbb')
  @NeedLogin()
  @NeedPermissions('/page1')
  testPermissionGuard() {
    return 'success';
  }
}
