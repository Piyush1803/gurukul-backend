import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from './otp.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private otpService: OtpService
  ) {}

  async validateUser(email:string, password:string){
    const user = await this.userService.findByEmailOrUsername(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const {password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(loginDto: LoginDto){
    const {identifier, password } = loginDto;

    const user = await this.userService.findByEmailOrUsername(identifier);
    if(!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = {sub: user.id, email:user.email, role:user.role,};
    return{
      access_token: this.jwtService.sign(payload),
    };
  }
    logout() {
      // on frontend: just delete the token 
      // on backend, 
      return { message: 'Logout Successful'} ;
    }

    // Send OTP to phone number
    async sendOtp(sendOtpDto: SendOtpDto) {
      const { phoneNumber } = sendOtpDto;
      
      console.log('Sending OTP to:', phoneNumber);
      
      try {
        await this.otpService.sendOtp(phoneNumber);
        console.log('OTP sent successfully to:', phoneNumber);
        return { 
          message: 'OTP sent successfully',
          phoneNumber: phoneNumber 
        };
      } catch (error) {
        console.error('Error sending OTP:', error);
        throw new BadRequestException('Failed to send OTP: ' + error.message);
      }
    }

    // Verify OTP and login/register user
    async verifyOtp(verifyOtpDto: VerifyOtpDto) {
      const { phoneNumber, otp } = verifyOtpDto;
      
      // Verify OTP
      const isOtpValid = await this.otpService.verifyOtp(phoneNumber, otp);
      if (!isOtpValid) {
        throw new UnauthorizedException('Invalid or expired OTP');
      }

      // Find or create user
      let user = await this.userService.findByPhoneNumber(phoneNumber);
      
      if (!user) {
        // Create new user with minimal data
        user = await this.userService.createOrUpdateByPhone(phoneNumber, {
          firstName: 'User',
          lastName: '',
          userName: `user_${phoneNumber}`,
          email: `${phoneNumber}@temp.com`, // Temporary email
          address: 'Not provided',
          password: '', // No password needed for OTP auth
        });
      }

      // Generate JWT token
      const payload = { 
        sub: user.id, 
        phoneNumber: user.phoneNumber, 
        role: user.role 
      };
      
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          phoneNumber: user.phoneNumber,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        }
      };
    }
  
}
