import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  console.log(
    `Database connection details database type = ${process.env.DB_TYPE} , host = ${process.env.DB_HOST}, port = ${process.env.DB_PORT}, username = ${process.env.DB_USERNAME}, database = ${process.env.DB_DATABASE}, database synchronization = ${process.env.DB_SYNCHRONIZE}`,
  );
  const config = new DocumentBuilder()
    .setTitle('Ardhangini Backend Api')
    .setDescription(
      'Ardhangini api to be consumed from Mobile Application, Frontend and Admin Application',
    )
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('ardhangini-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  //it should let class-trnsformer to use Nest Js dependency injection
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT);
}
bootstrap();
