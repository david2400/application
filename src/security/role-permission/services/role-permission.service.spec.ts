import {Test, TestingModule} from '@nestjs/testing'
import {RolePermissionService} from '@modules/security/role-permission/services/role-permission.service'

describe('RolePermissionService', () => {
  let service: RolePermissionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolePermissionService],
    }).compile()

    service = module.get<RolePermissionService>(RolePermissionService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
