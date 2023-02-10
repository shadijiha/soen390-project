import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const config = new DocumentBuilder()
    .setTitle(`${process.env.APP_NAME ?? 'skillswipe-dev'} API`)
    .setDescription(
      `The ${process.env.APP_NAME ?? 'skillswipe-dev'} API description`
    )
    .setVersion(process.env.VERSION ?? 'dev')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(8080)
}
void bootstrap()
