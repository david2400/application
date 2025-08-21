import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import {CreateCompanyInput} from '../dto/create-company.input'
import {UpdateCompanyInput} from '../dto/update-company.input'
import {CompanysService} from '../services/companys.service'

@Resolver('Company')
export class CompanysResolver {
  constructor(private readonly companysService: CompanysService) {}

  @Mutation('createCompany')
  create(@Args('createCompanyInput') createCompanyInput: CreateCompanyInput) {
    return this.companysService.create(createCompanyInput)
  }

  @Query('companys')
  findAll() {
    return this.companysService.findAll()
  }

  @Query('company')
  findOne(@Args('id') id: number) {
    return this.companysService.findOne(id)
  }

  @Mutation('updateCompany')
  update(@Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput) {
    return this.companysService.update(updateCompanyInput.id, updateCompanyInput)
  }

  @Mutation('removeCompany')
  remove(@Args('id') id: number) {
    return this.companysService.remove(id)
  }
}
