import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './mail/mail.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Fallback route to ensure mail inquiry works even if module routing is missed
  @Post('mail/course-inquiry')
  async courseInquiry(@Body() body: any) {
    const { name, email, phoneNo, age, message, submittedAt } = body || {};
    const to = process.env.COURSE_INQUIRY_TO || 'ankit44604@gmail.com';
    return await this.mailService.sendCourseInquiry({
      to,
      name,
      email,
      phoneNo,
      age,
      message,
      submittedAt,
    });
  }
}
