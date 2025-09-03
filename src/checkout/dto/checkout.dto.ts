import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CheckoutDto {
    @IsOptional()
    @IsString()
    customerName?: string;

    @IsOptional()
    @IsEmail()
    customerEmail?: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsString()
    currency?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CheckoutItemDto)
    items: CheckoutItemDto[];
}

export class CheckoutItemDto {
    @IsString()
    productId: string;

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;
}


