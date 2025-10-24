import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('course-inquiry')
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


