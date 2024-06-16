import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * GET 本地启动后欢迎页
   * @path /
   */
  @Get()
  getIndex(): string {
    return this.appService.getIndex();
  }
}
