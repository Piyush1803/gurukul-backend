import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Donut } from './entities/donut.entity';
import { deliciousCake } from './entities/deliciousCake.entity';
import { dryCake } from './entities/dryCake.entity';
import { cupCake } from './entities/cupCake.entity';
import { Pastry } from './entities/pastry.entity';
import { Pudding } from './entities/pudding.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Donut, deliciousCake, dryCake, cupCake, Pastry, Pudding])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
