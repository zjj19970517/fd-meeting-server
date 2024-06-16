import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filter/http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局 Pipe
  app.useGlobalPipes(new ValidationPipe());
  // 全局 Filter —— 异常处理
  app.useGlobalFilters(new HttpExceptionFilter());
  // 配置服务
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3000;

  await app.listen(port);
  console.log(`\n Meeting Server run at http://localhost:${port}`);
}

bootstrap();
