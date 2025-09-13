import { IsString, Length } from "class-validator";

export class VerifyOtpDto {
    @IsString()
    @Length(10, 15) // Phone number length
    phoneNumber: string;

    @IsString()
    @Length(4, 8) // Flexible OTP length
    otp: string;
}
