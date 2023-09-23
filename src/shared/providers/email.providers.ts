import { ConfigModule, ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

import { EmailProviderName } from 'src/constants/provider-names';

export const EmailProviders: Array<any> = [
  // 邮箱客户端
  {
    provide: EmailProviderName,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const transporter = createTransport({
        host: 'smtp.qq.com',
        port: 587,
        secure: false,
        auth: {
          user: configService.get<string>('email.user'),
          pass: configService.get<string>('email.pass'),
        },
      });
      return transporter;
    },
  },
];
