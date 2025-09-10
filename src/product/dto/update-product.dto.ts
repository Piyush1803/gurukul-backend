import { PartialType } from '@nestjs/mapped-types';
import { 
    CreateDeliciousCakeDto, 
    CreateBrownieDto, 
    CreateDryCakeDto, 
    CreateCupCakeDto, 
    CreateCookieDto, 
    CreateDonutDto, 
    CreateMousseDto 
} from './create-product.dto';

export class UpdateDeliciousCakeDto extends PartialType(CreateDeliciousCakeDto) { }
export class UpdateBrownieDto extends PartialType(CreateBrownieDto) { }
export class UpdateDryCakeDto extends PartialType(CreateDryCakeDto) { }
export class UpdateCupCakeDto extends PartialType(CreateCupCakeDto) { }
export class UpdateCookieDto extends PartialType(CreateCookieDto) { }
export class UpdateDonutDto extends PartialType(CreateDonutDto) { }
export class UpdateMousseDto extends PartialType(CreateMousseDto) { }