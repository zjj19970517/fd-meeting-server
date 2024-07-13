import { Inject, Injectable } from '@nestjs/common';
import { WinstonLogger } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class TestService {
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {
    this.logger.setContext(TestService.name);
  }

  getIndex(): string {
    this.logger.log('测试 Info 日志');
    this.logger.warn({
      context: TestService.name,
      aaa: 111,
      bbb: 111,
      configService: this.configService,
    });
    this.logger.error('测试 Error 日志');
    console.log('🌈 11' + this.configService.get('port'));
    return 'App Start Successfully !';
  }
}
