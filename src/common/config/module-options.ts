import { ConfigModuleOptions } from '@nestjs/config';

import configuration from './configuration';
import { __DEV__, __PROD__ } from '../utils/env.utils';

const envFilePath = ['.env'];

if (__DEV__) {
  envFilePath.unshift('.env.dev');
} else {
  envFilePath.unshift('.env.prod');
}

export const configModuleOptions: ConfigModuleOptions = {
  ignoreEnvFile: __PROD__ ? true : false,
  isGlobal: true,
  envFilePath: envFilePath,
  load: [configuration],
};
