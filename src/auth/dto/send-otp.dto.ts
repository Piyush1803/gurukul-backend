import { IsString, Length, IsOptional } from "class-validator";

export class SendOtpDto {
    @IsString()
    @Length(10, 15)
    phoneNumber: string;
}
