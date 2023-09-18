import { __DEV__ } from '../utils/env.utils';
import { genDevelopmentConfig } from './configuration.development';
import { genProductionConfig } from './configuration.production';

export interface IConfig {
  port: string | number; // 应用端口
  mysql: {
    host: string;
    port: number | string;
    username: string;
    password: string;
    database: string;
    logging: boolean;
    synchronize: boolean;
    poolSize: number;
    connectorPackage: 'mysql' | 'mysql2';
  };
}

export default (): IConfig => {
  if (__DEV__) {
    return genDevelopmentConfig();
  }
  return genProductionConfig();
};
