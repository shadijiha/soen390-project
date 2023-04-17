import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { GlobalErrorFilter } from './chat/exception.filter'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
// import { ValidationPipe } from '@nestjs/common'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)
  process.env.NODE_ENV !== 'development'
    ? app.enableCors({
      origin: [
        '*.skillswipe.app',
        'https://skillswipe.app',
        'https://www.skillswipe.app',
        'https://accounts.google.com'
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true
    })
    : app.enableCors({
      origin: [
        'localhost',
        'http://localhost:3000',
        'http://localhost',
        'https://accounts.google.com',
        '*.google.com'
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true
    })
  const config = new DocumentBuilder()
    .setTitle(`${process.env.APP_NAME ?? 'skillswipe-dev'} API`)
    .setDescription(
      `The ${process.env.APP_NAME ?? 'skillswipe-dev'} API description`
    )
    .setVersion(process.env.APP_VERSION ?? 'dev')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalFilters(new GlobalErrorFilter())
  app.use(cookieParser()) // cookie parser middleware

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.APP_PORT ?? 8080)
}
void bootstrap()
