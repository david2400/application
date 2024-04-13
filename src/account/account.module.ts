import {Module} from '@nestjs/common'
import {UserModule} from '@modules/account/user/user.module'
import {AuthModule} from '@modules/account/auth/auth.module'

@Module({
  imports: [UserModule, AuthModule],
  exports: [UserModule, AuthModule],
})
export class AccountModule {}
