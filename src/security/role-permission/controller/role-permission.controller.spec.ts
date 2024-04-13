import {Test, TestingModule} from '@nestjs/testing'
import {RolePermisionController} from '@modules/security/role-permission/controller/role-permission.controller'

describe('RolePermisionController', () => {
  let controller: RolePermisionController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolePermisionController],
    }).compile()

    controller = module.get<RolePermisionController>(RolePermisionController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
