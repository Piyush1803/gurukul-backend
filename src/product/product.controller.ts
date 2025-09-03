import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateCakeDto, CreateDonutDto, CreatePastryDto, CreatePuddingDto } from './dto/create-product.dto';
import { UpdateCakeDto, UpdateDonutDto, UpdatePastryDto, UpdatePuddingDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post(':type')
  async create(@Param('type') type: string, @Body() dto: any) {
    try {
      let data;
      switch (type) {
        case 'cake':
          data = await this.productService.create(type, dto as CreateCakeDto);
          break;
        case 'donut':
          data = await this.productService.create(type, dto as CreateDonutDto);
          break;
        case 'pastry':
          data = await this.productService.create(type, dto as CreatePastryDto);
          break;
        case 'pudding':
          data = await this.productService.create(type, dto as CreatePuddingDto);
          break;
        default:
          throw new BadRequestException('Invalid product type');
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
  async findOne(@Param('type') type: string, @Param('id') id: number) {
    try {
      const data = await this.productService.findOne(type, id);
      return { message: 'Product fetched successfully', data };
    } catch (error) {
      return { message: 'Error fetching product', error: error.message };
    }
  }

  @Patch(':type/:id')
  async update(@Param('type') type: string, @Param('id') id: number, @Body() dto: any) {
    try {
      let data;
      switch (type) {
        case 'cake':
          data = await this.productService.update(type, id, dto as UpdateCakeDto);
          break;
        case 'donut':
          data = await this.productService.update(type, id, dto as UpdateDonutDto);
          break;
        case 'pastry':
          data = await this.productService.update(type, id, dto as UpdatePastryDto);
          break;
        case 'pudding':
          data = await this.productService.update(type, id, dto as UpdatePuddingDto);
          break;
        default:
          throw new BadRequestException('Invalid product type');
      }
      return { message: 'Product updated successfully', data };
    } catch (error) {
      return { message: 'Error updating product', error: error.message };
    }
  }

  @Delete(':type/:id')
  async remove(@Param('type') type: string, @Param('id') id: number) {
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
