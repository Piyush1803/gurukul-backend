import { PartialType } from '@nestjs/mapped-types';
import { CreateCakeDto, CreateDonutDto, CreatePastryDto, CreatePuddingDto } from './create-product.dto';

export class UpdateCakeDto extends PartialType(CreateCakeDto) { }
export class UpdateDonutDto extends PartialType(CreateDonutDto) { }
export class UpdatePastryDto extends PartialType(CreatePastryDto) { }
export class UpdatePuddingDto extends PartialType(CreatePuddingDto) { }
