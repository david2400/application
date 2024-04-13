import {PUBLIC_KEY} from '@/constants'
import {SetMetadata, CustomDecorator} from '@nestjs/common'

export const Public = (): CustomDecorator => SetMetadata(PUBLIC_KEY, true)
