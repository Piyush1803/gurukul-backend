import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { User } from './user/entities/user.entity';
import { Product } from './product/entities/product.entity';
import { Donut } from './product/entities/donut.entity';
import { CheckoutModule } from './checkout/checkout.module';
import { dryCake } from './product/entities/dryCake.entity';
import { brownie } from './product/entities/brownie.entity';
import { mousse } from './product/entities/mousse.entity';
import { cupCake } from './product/entities/cupCake.entity';
import { cookie } from './product/entities/cookie.entity';
import { deliciousCake } from './product/entities/deliciousCake.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, Product, Donut, dryCake, brownie, mousse, cupCake, cookie, deliciousCake],
      synchronize: false, // Disabled for production safety
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    ProductModule,
    CheckoutModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
