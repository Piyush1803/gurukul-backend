import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendCourseInquiry(payload: {
    to: string;
    name: string;
    email: string;
    phoneNo: string;
    age: string;
    message: string;
    submittedAt: string;
  }) {
    const { to, name, email, phoneNo, age, message, submittedAt } = payload;

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new InternalServerErrorException('Email is not configured on server');
    }

    const text = `Course Inquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phoneNo}\nAge: ${age}\nMessage: ${message}\nSubmitted At: ${submittedAt}`;

    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        to,
        subject: `Course Inquiry from ${name}`,
        text,
      });
      return { success: true };
    } catch (err: any) {
      throw new InternalServerErrorException(err?.message || 'Failed to send email');
    }
  }
}


