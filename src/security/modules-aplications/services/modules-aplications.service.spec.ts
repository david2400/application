import {Test, TestingModule} from '@nestjs/testing'
import {ModulesAplicationsService} from './modules-aplications.service'

describe('ModulesAplicationsService', () => {
  let service: ModulesAplicationsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModulesAplicationsService],
    }).compile()

    service = module.get<ModulesAplicationsService>(ModulesAplicationsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
