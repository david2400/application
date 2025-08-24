import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {CreateCompanyInput} from '../dto/create-company.input'
import {UpdateCompanyInput} from '../dto/update-company.input'
import {Company} from '../entities/company.entity'
import {CompanyInput} from '../dto/company.input'
import {GenericService} from '@/common/services'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { UpdateResultInput } from '@/common/domain/dto/update-result.input'

@Injectable()
export class CompanysService extends GenericService<Company, CompanyInput> {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>
  ) {
    super(Company, CompanyInput)
  }

  protected getRepository(): Repository<Company> {
    return this.companyRepository
  }

  async createCompany(company: CreateCompanyInput) {
    // const result = await this.findOneByEmail(company.email) // || (await this.findOneByUsername(company.username))
    // if (result != null) {
    //   throw new HttpException({message: 'User already registered'}, HttpStatus.NOT_FOUND)
    // }
    const newCompany = this.getRepository().create(company)

    const results = await this.getRepository().save(newCompany)
    // const sendEmail = await this.sendEmail()

    return results
  }

  async updateCompany(id: number, company: UpdateCompanyInput): Promise<UpdateResultInput> {
    const newCompany = await this.getRepository().findOneById(id)
    if (!newCompany) {
      throw new HttpException(
        {message: 'company does not exist or could not be modify!'},
        HttpStatus.NOT_FOUND
      )
    }

    this.getRepository().merge(newCompany, company)

    const result = await this.getRepository().update(id, newCompany)

    return result
  }
}
