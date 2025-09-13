import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto : LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/logout')
  logout() {
    return this.authService.logout();
  }

  @Post('/send-otp')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto);
  }

  @Post('/verify-otp')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Get('/test')
  test() {
    return { message: 'Auth service is working', timestamp: new Date().toISOString() };
  }
}
