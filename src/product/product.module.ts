import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeliciousCake } from './entities/delicious-cake.entity';
import { Brownie } from './entities/brownie.entity';
import { DryCake } from './entities/dry-cake.entity';
import { CupCake } from './entities/cup-cake.entity';
import { Cookie } from './entities/cookie.entity';
import { Donut } from './entities/donut.entity';
import { Mousse } from './entities/mousse.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, DeliciousCake, Brownie, DryCake, CupCake, Cookie, Donut, Mousse])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
