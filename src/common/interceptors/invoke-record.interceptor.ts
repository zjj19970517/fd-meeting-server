import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as requestIp from 'request-ip';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger } from 'nest-winston';
import { Observable, tap } from 'rxjs';

/**
 * 请求记录拦截器
 */
@Injectable()
export class InvokeRecordInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {
    this.logger.setContext(InvokeRecordInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const { ip, method, path } = request;

    const clientIp = requestIp.getClientIp(ip) || ip;

    // 请求触发
    this.logger.debug(
      `${method} ${path} ${clientIp} : ${context.getClass().name} ${
        context.getHandler().name
      } invoked...`,
    );

    return next.handle().pipe(
      tap((res) => {
        // 返回响应
        this.logger.debug(
          `${method} ${path} ${clientIp} : ${
            response.statusCode
          } - ${JSON.stringify(res)}`,
        );
      }),
    );
  }
}
