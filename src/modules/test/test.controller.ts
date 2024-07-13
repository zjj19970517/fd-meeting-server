import { Controller, Get, Inject } from '@nestjs/common';

import { TestService } from './test.service';
import { ConfigService } from '@nestjs/config';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Inject(ConfigService)
  private configService: ConfigService;

  /**
   * GET 本地启动后欢迎页
   * @path /
   */
  @Get('get')
  getIndex(): string {
    return this.testService.getIndex();
  }
}
