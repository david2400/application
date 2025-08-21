import {NestFactory} from '@nestjs/core'
import {ValidationPipe, Logger} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {AppModule} from './app.module'

async function bootstrap() {
  const logger = new Logger('Bootstrap')

  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
      snapshot: true,
    })

    const configService = app.get(ConfigService)
    const globalPrefix = configService.get('URL_PREFIX') || 'api'
    const port = configService.get('PORT') || 3000

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    )

    // Set global prefix
    app.setGlobalPrefix(globalPrefix)

    // Enable CORS
    app.enableCors({
      origin: configService.get('CORS_ORIGIN') || '*',
      credentials: true,
    })

    await app.listen(port)
    logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
    logger.log(`📊 Environment: ${configService.get('NODE_ENV') || 'development'}`)
  } catch (error) {
    logger.error('❌ Error starting application:', error)
    process.exit(1)
  }
}

bootstrap()
