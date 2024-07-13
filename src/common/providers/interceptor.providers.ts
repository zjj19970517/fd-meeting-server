import { APP_INTERCEPTOR } from '@nestjs/core';

import { FormatResponseInterceptor } from '../interceptors/format-response.interceptor';
import { InvokeRecordInterceptor } from '../interceptors/invoke-record.interceptor';
import { TimeoutInterceptor } from '../interceptors/timeout-interceptor';

export const InterceptorProviders = [
  // 响应格式化拦截器
  {
    provide: APP_INTERCEPTOR,
    useClass: FormatResponseInterceptor,
  },
  // 拦截器 - 请求日志记录
  {
    provide: APP_INTERCEPTOR,
    useClass: InvokeRecordInterceptor,
  },
  // 超时拦截器
  {
    provide: APP_INTERCEPTOR,
    useClass: TimeoutInterceptor,
  },
];
