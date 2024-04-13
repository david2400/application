import {Module} from '@nestjs/common'
import {SigninModule} from '@modules/account/auth/signin/signin.module'

@Module({
  exports: [SigninModule],
  imports: [SigninModule],
})
export class AuthModule {}
