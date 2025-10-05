import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { Product } from './entities/product.entity';
import { Donut } from './entities/donut.entity';
import { deliciousCake } from './entities/deliciousCake.entity';
import { dryCake } from './entities/dryCake.entity';
import { cupCake } from './entities/cupCake.entity';
import { Pastry } from './entities/pastry.entity';
import { Pudding } from './entities/pudding.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Donut, deliciousCake, dryCake, cupCake, Pastry, Pudding]),
    MulterModule.register({
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
        files: 1, // Only allow 1 file at a time
      },
      fileFilter: (req, file, callback) => {
        // Only allow image files
        if (file.mimetype && file.mimetype.startsWith('image/')) {
          callback(null, true);
        } else {
          callback(new Error('Only image files are allowed'), false);
        }
      },
    }),
    CloudinaryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
