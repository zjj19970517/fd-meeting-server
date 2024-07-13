import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { format, transports } from 'winston';

import { __DEV__ } from '@common/utils/env.utils';

/**
 * Winston 配置
 */
export const WinstonOptions = {
  level: __DEV__ ? 'debug' : 'info',
  transports: [
    // 输出日志到控制台
    new transports.Console({
      format: format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('Nest', {
          colors: true,
          prettyPrint: true,
          processId: true,
          appName: true,
        }),
      ),
    }),
    // 错误日志到的单独输出到 error.log
    new transports.File({
      format: format.combine(format.timestamp(), format.json()),
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 1024 * 1024 * 20, // 20 MB
    }),
    // 全部日志按时间进行存储
    new winston.transports.DailyRotateFile({
      dirname: `logs`, // 日志保存的目录
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json(),
      ),
      level: 'info',
      filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
      datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天
      maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb
      maxFiles: '7d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
      zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件
    }),
    // TODO: 记录日志到日志库
  ],
  // 未捕获异常处理
  exceptionHandlers: [
    new winston.transports.File({
      format: format.combine(format.timestamp(), format.json()),
      maxsize: 1024 * 1024 * 30, // 30 MB
      filename: 'logs/unCatchError.log',
    }),
  ],
};
