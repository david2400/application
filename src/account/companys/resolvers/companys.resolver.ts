import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import {CreateCompanyInput} from '../dto/create-Company.input'
import {UpdateCompanyInput} from '../dto/update-Company.input'
import {CompanysService} from '../services/companys.service'
import {Company} from '../entities/company.entity'
import { CompanyInput } from '../dto/company.input'
import { UpdateResultInput } from '@/common/domain/dto/update-result.input'

@Resolver(() => Company)
export class CompanysResolver {
  constructor(private readonly companysService: CompanysService) {}

  @Mutation(() => CompanyInput)
  async create(@Args('company') createCompanyInput: CreateCompanyInput) {
    return this.companysService.createCompany(createCompanyInput)
  }

  @Query(() => [CompanyInput])
  async findAllCompany() {
    return this.companysService.findAll()
  }

  @Query(() => CompanyInput)
  async findOneCompany(@Args('id') id: number) {
    return this.companysService.findOne(id)
  }

  @Mutation(() => UpdateResultInput)
  async updateCompany(@Args('company') updateCompanyInput: UpdateCompanyInput) {
    return this.companysService.updateCompany(updateCompanyInput.id_company, updateCompanyInput)
  }

  @Mutation(() => UpdateResultInput)
  async removeCompany(@Args('id') id: number) {
    return this.companysService.deleteById(id)
  }
}
