import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SiteImageModule } from './site-image/site-image.module';
import { CommonModule } from './common';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ global: true }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql' | 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      synchronize: process.env.DB_SYNCHRONIZE as unknown as boolean,
      logging: true,
      autoLoadEntities: true,
      //entities: [...entities],
    }),
    ScheduleModule.forRoot(),
    CommonModule,
    ProductModule,
    UserModule,
    SiteImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
