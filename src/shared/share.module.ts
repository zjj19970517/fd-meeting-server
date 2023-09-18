import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DataBaseProviders } from './providers/database.providers';
import { configModuleOptions } from './config/module-options';

// 共享模块
@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)],
  exports: [
    // 配置中心
    ConfigModule,
    // 数据库连接
    ...DataBaseProviders,
  ],
  providers: [...DataBaseProviders],
})
export class SharedModule {}
