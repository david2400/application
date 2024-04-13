import {Test, TestingModule} from '@nestjs/testing'
import {AplicationsService} from '@modules/security/aplications/services/aplications.service'

describe('AplicationsService', () => {
  let service: AplicationsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AplicationsService],
    }).compile()

    service = module.get<AplicationsService>(AplicationsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
