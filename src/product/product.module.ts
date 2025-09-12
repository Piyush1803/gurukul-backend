import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Donut } from './entities/donut.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Cake, Donut,])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
