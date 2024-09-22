import {NestFactory} from '@nestjs/core'
import {ValidationPipe} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {AppModule} from './app.module'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
    snapshot: true,
  })

  // app.useGlobalFilters(new HttpExceptionFilter())
  const configService = app.get(ConfigService)
  const globalPrefix = configService.get('URL_PREFIX')
  const port = configService.get('PORT')
  const swagger = new DocumentBuilder()
    .setTitle('Segurity')
    .setVersion('1.0')
    .addTag('segurity')
    .build()
  const configSwagger = SwaggerModule.createDocument(app, swagger)
  SwaggerModule.setup(globalPrefix, app, configSwagger)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )
  app.setGlobalPrefix(globalPrefix)

  await app.listen(port)
}
bootstrap()
