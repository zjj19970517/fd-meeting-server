import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { FormatResponseInterceptor } from './shared/interceptors/format-response.interceptor';
import { HttpExceptionFilter } from './shared/filter/http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3000;
  await app.listen(port);
  console.log(`\n Meeting Server run at http://localhost:${port}`);
}

bootstrap();
