import { DynamicModule, Module } from '@nestjs/common';
import { LoggerOptions } from 'winston';
import { CustomLogger } from '../../common/logger/logger';

export const WINSTON_LOGGER_TOKEN = 'WINSTON_LOGGER';

@Module({
  /** Winston 日志模块 */
})
export class WinstonLoggerModule {
  public static forRoot(options: LoggerOptions): DynamicModule {
    return {
      module: WinstonLoggerModule,
      providers: [
        {
          provide: WINSTON_LOGGER_TOKEN,
          useValue: new CustomLogger(options),
        },
      ],
      exports: [WINSTON_LOGGER_TOKEN],
    };
  }
}
