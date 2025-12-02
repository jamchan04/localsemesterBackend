import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { SendMailOptions, Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private readonly transporter?: Transporter;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('SMTP_HOST');
    const port = Number(this.configService.get<string>('SMTP_PORT') ?? 587);
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASS');
    const secure =
      this.configService.get<string>('SMTP_SECURE') === 'true' || port === 465;

    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });
    }
  }

  async sendVerificationEmail(to: string, link: string) {
    const from =
      this.configService.get<string>('EMAIL_FROM') ||
      this.configService.get<string>('SMTP_USER');

    await this.sendMail({
      to,
      from,
      subject: 'Email verification',
      html: `
        <p>안녕하세요, 로컬세메스터입니다.</p>
        <p>아래 버튼을 눌러 이메일을 인증해 주세요.</p>
        <p><a href="${link}">이메일 인증하기</a></p>
        <p>버튼이 안 보이면 링크를 복사해 브라우저에 붙여넣어 주세요:</p>
        <p>${link}</p>
      `,
    });
  }

  private async sendMail(options: SendMailOptions) {
    if (!this.transporter) {
      throw new InternalServerErrorException(
        'SMTP configuration is missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.',
      );
    }

    try {
      await this.transporter.sendMail(options);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to send email. Check SMTP configuration.',
      );
    }
  }
}
