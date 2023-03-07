import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)
  process.env.NODE_ENV !== 'development'
    ? app.enableCors({
      origin: [
        '*.skillswipe.app',
        'https://skillswipe.app',
        'https://www.skillswipe.app'
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204
    })
    : app.enableCors()
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

  // app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.APP_PORT ?? 8080)
}
void bootstrap()
