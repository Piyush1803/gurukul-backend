import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { 
  CreateDeliciousCakeDto, 
  CreateBrownieDto, 
  CreateDryCakeDto, 
  CreateCupCakeDto, 
  CreateCookieDto, 
  CreateDonutDto, 
  CreateMousseDto 
} from './dto/create-product.dto';
import { 
  UpdateDeliciousCakeDto, 
  UpdateBrownieDto, 
  UpdateDryCakeDto, 
  UpdateCupCakeDto, 
  UpdateCookieDto, 
  UpdateDonutDto, 
  UpdateMousseDto 
} from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post(':type')
  async create(@Param('type') type: string, @Body() dto: any) {
    try {
      let data;
      switch (type) {
        case 'delicious-cake':
          data = await this.productService.create(type, dto as CreateDeliciousCakeDto);
          break;
        case 'brownie':
          data = await this.productService.create(type, dto as CreateBrownieDto);
          break;
        case 'dry-cake':
          data = await this.productService.create(type, dto as CreateDryCakeDto);
          break;
        case 'cup-cake':
          data = await this.productService.create(type, dto as CreateCupCakeDto);
          break;
        case 'cookie':
          data = await this.productService.create(type, dto as CreateCookieDto);
          break;
        case 'donut':
          data = await this.productService.create(type, dto as CreateDonutDto);
          break;
        case 'mousse':
          data = await this.productService.create(type, dto as CreateMousseDto);
          break;
        default:
          throw new BadRequestException('Invalid product type. Valid types: delicious-cake, brownie, dry-cake, cup-cake, cookie, donut, mousse');
      }
      return { message: 'Product created successfully', data };
    } catch (error) {
      return { message: 'Error creating product', error: error.message };
    }
  }

  @Get('/all/:type')
  async findAllByType(@Param('type') type: string) {
    try {
      const data = await this.productService.findAllByType(type);
      return { message: 'Products fetched successfully', data };
    } catch (error) {
      return { message: 'Error fetching products', error: error.message };
    }
  }

  @Get(':type/:id')
  async findOne(@Param('type') type: string, @Param('id') id: string) {
    try {
      const data = await this.productService.findOne(type, id);
      return { message: 'Product fetched successfully', data };
    } catch (error) {
      return { message: 'Error fetching product', error: error.message };
    }
  }

  @Patch(':type/:id')
  async update(@Param('type') type: string, @Param('id') id: string, @Body() dto: any) {
    try {
      let data;
      switch (type) {
        case 'delicious-cake':
          data = await this.productService.update(type, id, dto as UpdateDeliciousCakeDto);
          break;
        case 'brownie':
          data = await this.productService.update(type, id, dto as UpdateBrownieDto);
          break;
        case 'dry-cake':
          data = await this.productService.update(type, id, dto as UpdateDryCakeDto);
          break;
        case 'cup-cake':
          data = await this.productService.update(type, id, dto as UpdateCupCakeDto);
          break;
        case 'cookie':
          data = await this.productService.update(type, id, dto as UpdateCookieDto);
          break;
        case 'donut':
          data = await this.productService.update(type, id, dto as UpdateDonutDto);
          break;
        case 'mousse':
          data = await this.productService.update(type, id, dto as UpdateMousseDto);
          break;
        default:
          throw new BadRequestException('Invalid product type. Valid types: delicious-cake, brownie, dry-cake, cup-cake, cookie, donut, mousse');
      }
      return { message: 'Product updated successfully', data };
    } catch (error) {
      return { message: 'Error updating product', error: error.message };
    }
  }

  @Delete(':type/:id')
  async remove(@Param('type') type: string, @Param('id') id: string) {
    try {
      const data = await this.productService.remove(type, id);
      return { message: 'Product deleted successfully', data };
    } catch (error) {
      return { message: 'Error deleting product', error: error.message };
    }
  }

  @Get("/all")
  async findAllProducts() {
    try {
      const data = await this.productService.findAll();
      return { message: 'All products fetched successfully', data };
    } catch (error) {
      return { message: 'Error fetching products', error: error.message };
    }
  }
}