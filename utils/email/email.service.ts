import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: '0173ec191025@gmail.com',
        pass: 'tditvfmqhepoemfh',
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: '0173ec191025@gmail.com',
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}