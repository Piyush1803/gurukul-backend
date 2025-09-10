import { IsString, IsOptional, IsInt, Min, IsBoolean, IsNumber } from 'class-validator';

export class CreateDeliciousCakeDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    flavor: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsInt()
    @Min(1)
    layers: number;

    @IsString()
    size: string;

    @IsNumber()
    @Min(0)
    weight: number;

    @IsOptional()
    image?: Buffer;
}

export class CreateBrownieDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    flavor: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsString()
    texture: string;

    @IsBoolean()
    hasNuts: boolean;

    @IsString()
    size: string;

    @IsOptional()
    image?: Buffer;
}

export class CreateDryCakeDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    flavor: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsInt()
    @Min(1)
    shelfLife: number;

    @IsString()
    packaging: string;

    @IsNumber()
    @Min(0)
    weight: number;

    @IsOptional()
    image?: Buffer;
}

export class CreateCupCakeDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    flavor: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsString()
    frostingType: string;

    @IsBoolean()
    hasToppings: boolean;

    @IsString()
    size: string;

    @IsOptional()
    image?: Buffer;
}

export class CreateCookieDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    flavor: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsString()
    texture: string;

    @IsBoolean()
    hasChocolateChips: boolean;

    @IsNumber()
    @Min(0)
    diameter: number;

    @IsOptional()
    image?: Buffer;
}

export class CreateDonutDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    flavor: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsString()
    glazeType: string;

    @IsBoolean()
    hasFilling: boolean;

    @IsString()
    @IsOptional()
    fillingType?: string;

    @IsOptional()
    image?: Buffer;
}

export class CreateMousseDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    flavor: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsString()
    servingSize: string;

    @IsBoolean()
    hasLayers: boolean;

    @IsString()
    temperature: string;

    @IsOptional()
    image?: Buffer;
}