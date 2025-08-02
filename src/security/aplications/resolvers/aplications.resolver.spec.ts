import {Test, TestingModule} from '@nestjs/testing'
import {AplicationsResolver} from './aplications.resolver'
import {AplicationsService} from '../services/aplications.service'

describe('AplicationsResolver', () => {
  let resolver: AplicationsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AplicationsResolver, AplicationsService],
    }).compile()

    resolver = module.get<AplicationsResolver>(AplicationsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
