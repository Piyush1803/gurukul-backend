import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateCakeDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    flavor: string;

    @IsInt()
    @Min(0)
    quantity: number;

    @IsString()
    imageUrl: string;

    @IsInt()
    @IsOptional()
    layers?: number;
}

export class CreateDonutDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    flavor: string;

    @IsInt()
    @Min(0)
    quantity: number;

    @IsString()
    imageUrl: string;

    @IsString()
    @IsOptional()
    filling?: string;
}

export class CreatePastryDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    flavor: string;

    @IsInt()
    @Min(0)
    quantity: number;

    @IsString()
    imageUrl: string;
}

export class CreatePuddingDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    flavor: string;

    @IsInt()
    @Min(0)
    quantity: number;

    @IsString()
    imageUrl: string;
}
