import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
  ) {}

  // Generate a 6-digit OTP
  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send OTP (in production, integrate with SMS service like Twilio, AWS SNS, etc.)
  async sendOtp(phoneNumber: string): Promise<string> {
    try {
      console.log('Generating OTP for:', phoneNumber);
      
      const otpCode = this.generateOtp();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

      // Delete any existing OTPs for this phone number
      await this.otpRepository.delete({ phoneNumber });

      // Create new OTP record
      const otp = this.otpRepository.create({
        phoneNumber,
        otpCode,
        expiresAt,
      });

      await this.otpRepository.save(otp);

      // In development, log the OTP to console
      // In production, send via SMS service
      console.log(`OTP for ${phoneNumber}: ${otpCode}`);
      
      return otpCode;
    } catch (error) {
      console.error('Error in sendOtp:', error);
      throw error;
    }
  }

  // Verify OTP
  async verifyOtp(phoneNumber: string, otpCode: string): Promise<boolean> {
    const otp = await this.otpRepository.findOne({
      where: { phoneNumber, otpCode, isVerified: false },
    });

    if (!otp) {
      return false;
    }

    // Check if OTP has expired
    if (new Date() > otp.expiresAt) {
      await this.otpRepository.remove(otp);
      return false;
    }

    // Mark OTP as verified
    otp.isVerified = true;
    await this.otpRepository.save(otp);

    return true;
  }

  // Clean up expired OTPs
  async cleanupExpiredOtps(): Promise<void> {
    await this.otpRepository
      .createQueryBuilder()
      .delete()
      .where('expiresAt < :now', { now: new Date() })
      .execute();
  }
}
