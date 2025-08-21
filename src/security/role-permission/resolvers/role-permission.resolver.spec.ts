import {Test, TestingModule} from '@nestjs/testing'
import {RolePermissionResolver} from './role-permission.resolver'
import {RolePermissionService} from '../services/role-permission.service'
import {CreateRolePermissionInput} from '../dto/create-role-permission.input'
import {UpdateRolePermissionInput} from '../dto/update-role-permission.input'
import {RolePermissionInput} from '../dto/role-permission.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'

describe('RolePermissionResolver', () => {
  let resolver: RolePermissionResolver
  let service: RolePermissionService

  const mockRolePermissionService = {
    createRolePermission: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateRolePermission: jest.fn(),
    deleteById: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolePermissionResolver,
        {
          provide: RolePermissionService,
          useValue: mockRolePermissionService,
        },
      ],
    }).compile()

    resolver = module.get<RolePermissionResolver>(RolePermissionResolver)
    service = module.get<RolePermissionService>(RolePermissionService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createRolePermission', () => {
    it('should create a new role permission successfully', async () => {
      const createInput: CreateRolePermissionInput = {
        level: '1',
        role_id: 1,
        permission_id: 1,
        created_usr: 1,
        created_at: new Date(),
      }

      const expectedResult: RolePermissionInput = {
        level: '1',
        role_id: 1,
        permission_id: 1,
        created_usr: 1,
        created_at: new Date(),
      } as RolePermissionInput

      mockRolePermissionService.createRolePermission.mockResolvedValue(expectedResult)

      const result = await resolver.createRolePermission(createInput)

      expect(service.createRolePermission).toHaveBeenCalledWith(createInput)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during creation', async () => {
      const createInput: CreateRolePermissionInput = {
        role_id: 1,
        level: '1',
        permission_id: 1,
        created_usr: 1,
        created_at: new Date(),
      }

      const mockError = new Error('Service error')
      mockRolePermissionService.createRolePermission.mockRejectedValue(mockError)

      await expect(resolver.createRolePermission(createInput)).rejects.toThrow(mockError)
      expect(service.createRolePermission).toHaveBeenCalledWith(createInput)
    })
  })

  describe('findAllRolePermission', () => {
    it('should return all role permissions', async () => {
      const expectedResult: RolePermissionInput[] = [
        {
          role_id: 1,
          level: '1',
          permission_id: 1,
          created_usr: 1,
          created_at: new Date(),
        },
        {
          level: '1',
          role_id: 1,
          permission_id: 2,
          created_usr: 1,
          created_at: new Date(),
        },
      ] as RolePermissionInput[]

      mockRolePermissionService.findAll.mockResolvedValue(expectedResult)

      const result = await resolver.findAllRolePermission()

      expect(service.findAll).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during findAll', async () => {
      const mockError = new Error('Service error')
      mockRolePermissionService.findAll.mockRejectedValue(mockError)

      await expect(resolver.findAllRolePermission()).rejects.toThrow(mockError)
      expect(service.findAll).toHaveBeenCalled()
    })
  })

  describe('findOneRolePermission', () => {
    it('should return a role permission by id', async () => {
      const id = 1
      const expectedResult: RolePermissionInput = {
        level: '1',
        role_id: 1,
        permission_id: 1,
        created_usr: 1,
        created_at: new Date(),
      } as RolePermissionInput

      mockRolePermissionService.findOne.mockResolvedValue(expectedResult)

      const result = await resolver.findOneRolePermission(id)

      expect(service.findOne).toHaveBeenCalledWith(id)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during findOne', async () => {
      const id = 1
      const mockError = new Error('Service error')
      mockRolePermissionService.findOne.mockRejectedValue(mockError)

      await expect(resolver.findOneRolePermission(id)).rejects.toThrow(mockError)
      expect(service.findOne).toHaveBeenCalledWith(id)
    })
  })

  // Tests for commented updateRolePermission method
  describe('updateRolePermission (commented method)', () => {
    it('should be implemented when uncommented', () => {
      // This test will be updated when the method is uncommented
      expect(true).toBe(true)
    })

    it('should handle update when implemented', async () => {
      // Placeholder test for when updateRolePermission is uncommented
      const updateInput: UpdateRolePermissionInput = {
        role_id: 1,
        permission_id: 2,
        level: '1',
      }

      // This test will be updated when the method is uncommented
      expect(updateInput).toBeDefined()
    })
  })

  describe('removeRolePermission', () => {
    it('should remove a role permission successfully', async () => {
      const id = 1
      const expectedResult: UpdateResultInput = {affected: 1} as UpdateResultInput

      mockRolePermissionService.deleteById.mockResolvedValue(expectedResult)

      const result = await resolver.removeRolePermission(id)

      expect(service.deleteById).toHaveBeenCalledWith(id)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during removal', async () => {
      const id = 1
      const mockError = new Error('Service error')
      mockRolePermissionService.deleteById.mockRejectedValue(mockError)

      await expect(resolver.removeRolePermission(id)).rejects.toThrow(mockError)
      expect(service.deleteById).toHaveBeenCalledWith(id)
    })
  })

  describe('GraphQL decorators', () => {
    it('should have correct GraphQL decorators', () => {
      const metadata = Reflect.getMetadata('graphql:resolver_type', RolePermissionResolver)
      expect(metadata).toBeDefined()
    })

    it('should have correct mutation decorators', () => {
      const createMetadata = Reflect.getMetadata('graphql:mutation', resolver.createRolePermission)
      const removeMetadata = Reflect.getMetadata('graphql:mutation', resolver.removeRolePermission)

      expect(createMetadata).toBeDefined()
      expect(removeMetadata).toBeDefined()
    })

    it('should have correct query decorators', () => {
      const findAllMetadata = Reflect.getMetadata('graphql:query', resolver.findAllRolePermission)
      const findOneMetadata = Reflect.getMetadata('graphql:query', resolver.findOneRolePermission)

      expect(findAllMetadata).toBeDefined()
      expect(findOneMetadata).toBeDefined()
    })

    // Test for commented updateRolePermission decorator
    it('should have update mutation decorator when implemented', () => {
      // This test will be updated when the updateRolePermission method is uncommented
      expect(true).toBe(true)
    })
  })
})
