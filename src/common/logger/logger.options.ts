import * as chalk from 'chalk';
import { format, transports } from 'winston';
import { __DEV__ } from '../utils/env.utils';

/**
 * Winston 配置
 */
export const WinstonOptions = {
  level: __DEV__ ? 'debug' : 'info',
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ context, level, message, time }) => {
          const appStr = chalk.green(`[NEST]`);
          const contextStr = chalk.yellow(`[${context}]`);

          return `${appStr} ${time} ${level} ${contextStr} ${message} `;
        }),
      ),
    }),
    new transports.File({
      format: format.combine(format.timestamp(), format.json()),
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({
      format: format.combine(format.timestamp(), format.json()),
      filename: 'logs/combined.log',
    }),
  ],
};
