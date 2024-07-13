import { Inject, Injectable } from '@nestjs/common';
// import { WINSTON_LOGGER_TOKEN } from './modules/shared/logger.module';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  // @Inject(WINSTON_LOGGER_TOKEN)
  // private logger;

  @Inject(ConfigService)
  private configService: ConfigService;

  getIndex(): string {
    // this.logger.info('测试 Info 日志');
    // this.logger.debug('测试 Debug 日志');
    // this.logger.error('测试 Debug 日志');
    return 'App Start Successfully !';
  }
}
