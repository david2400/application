import {Global, Module, forwardRef} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import {ConfigService, ConfigModule} from '@nestjs/config'
import {JwtStrategy} from '@/config/estrategy/jwtStrategy.strategy'
import {SigninService} from '@modules/account/auth/signin/services/signin.service'
import {UserModule} from '@modules/account/user/user.module'
import {SigninController} from '@modules/account/auth/signin/controller/signin.controller'

@Global()
@Module({
  providers: [SigninService, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: {
          expiresIn: configService.get<string>('jwtTimeout'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [SigninService],
  controllers: [SigninController],
})
export class SigninModule {}
