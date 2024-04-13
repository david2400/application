import {Module} from '@nestjs/common'
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {configuration} from '@config/configuration'
// import {MailerConfigsModule} from '@config/mailer/mailer.config'

@Module({
  imports: [
    // MailerConfigsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('db'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ConfigsModule {}
