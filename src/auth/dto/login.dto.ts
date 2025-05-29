import {IsString } from "class-validator";


export class LoginDto {

    @IsString()
    identifier:string; // can be email or username

    @IsString()
    password: string;
}
