import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Cake } from './entities/cake.entity';
import { Donut } from './entities/donut.entity';
import { Pastry } from './entities/pastry.entity';
import { Pudding } from './entities/pudding.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Cake, Donut, Pastry, Pudding])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
