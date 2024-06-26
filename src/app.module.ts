import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ProductModule } from './product/product.module';
import { ProductpriceModule } from './productprice/productprice.module';
import { ProductofferModule } from './productoffer/productoffer.module';
import { CartinformationModule } from './cartinformation/cartinformation.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { UserModule } from './user/user.module';
import { UserSocialLoginModule } from './user-social-login/user-social-login.module';
import { SiteImageModule } from './site-image/site-image.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql' | 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      synchronize: process.env.DB_SYNCHRONIZE as unknown as boolean,
      logging: true,
      entities: [...entities],
    }),
    CategoryModule,
    SubcategoryModule,
    ProductModule,
    ProductpriceModule,
    ProductofferModule,
    CartinformationModule,
    OrderModule,
    PaymentModule,
    UserModule,
    UserSocialLoginModule,
    SiteImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
