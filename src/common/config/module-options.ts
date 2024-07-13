import { ConfigModuleOptions } from '@nestjs/config';

import configuration from './configuration';
import { __DEV__ } from '../utils/env.utils';

const envFilePath = ['.env'];

if (__DEV__) {
  envFilePath.unshift('.env.dev');
} else {
  envFilePath.unshift('.env.prod');
}

export const configModuleOptions: ConfigModuleOptions = {
  // 如果你不想加载 .env 文件，而是想简单地从运行时环境访问环境变量，可以将 ignoreEnvFile 设置为 true。
  // 没有必要在生产环境中加载 .env 文件，因为环境变量已经在服务器上设置好了。
  // ignoreEnvFile: __PROD__ ? true : false,
  ignoreEnvFile: false,
  isGlobal: true,
  envFilePath: envFilePath,
  load: [configuration],
};
