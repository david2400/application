import {Test, TestingModule} from '@nestjs/testing'
import {AplicationsController} from '@modules/security/aplications/controller/aplications.controller'
import {AplicationsService} from '@modules/security/aplications/services/aplications.service'

describe('AplicationsController', () => {
  let controller: AplicationsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AplicationsController],
      providers: [AplicationsService],
    }).compile()

    controller = module.get<AplicationsController>(AplicationsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
