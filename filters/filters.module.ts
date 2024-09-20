import {Module, Scope} from '@nestjs/common'
import {APP_FILTER} from '@nestjs/core'
import {HttpExceptionFilter} from '@common/filters/httpExceptions/httpExceptions.filter'

@Module({
  providers: [
    {
      provide: APP_FILTER,
      scope: Scope.REQUEST,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class FiltersModule {}
