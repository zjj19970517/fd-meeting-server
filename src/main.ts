import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from './app.module';
import { swaggerConfig } from './swagger';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';

async function bootstrap() {
  // 创建应用
  const app = await NestFactory.create(AppModule, {
    // 控制台应该输出什么级别的日志
    // 开发环境下，日志可打印在控制台
    // 生产环境下，日志不能打印在控制台（因为大多数情况下是集群，集群就不好排查了）
    // 生产环境下的日志方案：一般都是统一收集到日志平台，如：SLS 等。
    logger: false,
    bufferLogs: true, // 开启日志缓冲，防止日志丢失
    // 另外 logger: LoggerService 我们也可以使用这种方式进行自定义本地日志打印方式，但是一般不会自定义的，因为 nestjs 已经提供了很好的日志打印方式
  });

  // 启动 swagger 文档
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  // Winston 日志
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // 应用全局 Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 自动把参数 js 对象转换为 dto 类型对象
    }),
  );

  // 应用全局 Filter —— 异常处理
  app.useGlobalFilters(new HttpExceptionFilter());

  // 获取全局配置
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3000;

  // 端口监听
  await app.listen(port);
  console.log(`\n Meeting Server run at http://localhost:${port} \n`);
}

bootstrap();
