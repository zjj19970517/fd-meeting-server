import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Nest Server')
  .setDescription('Nest 服务 API 文档')
  .setVersion('1.0')
  .addTag('test')
  .build();
