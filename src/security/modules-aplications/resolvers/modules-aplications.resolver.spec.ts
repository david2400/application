import {Test, TestingModule} from '@nestjs/testing'
import {ModulesAplicationsResolver} from './modules-aplications.resolver'
import {ModulesAplicationsService} from '../services/modules-aplications.service'

describe('ModulesAplicationsResolver', () => {
  let resolver: ModulesAplicationsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModulesAplicationsResolver, ModulesAplicationsService],
    }).compile()

    resolver = module.get<ModulesAplicationsResolver>(ModulesAplicationsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
