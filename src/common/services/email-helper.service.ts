import { Transporter } from 'nodemailer';
import { Inject, Injectable } from '@nestjs/common';

import { EmailProviderName } from 'src/constants/provider-names';

@Injectable()
export class EmailHelperService {
  @Inject(EmailProviderName)
  private transporter: Transporter;

  /**
   * 发送邮件
   * @param email 目标邮件
   * @param html 邮件内容
   * @param subject 邮件主题
   */
  async sendMail(
    email: string,
    html: string,
    subject: string,
    text: string = '',
  ) {
    await this.transporter.sendMail({
      from: '会议预定系统 <1392372716@qq.com>',
      to: email,
      subject,
      html,
      text,
    });
  }
}
