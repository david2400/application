import {Test, TestingModule} from '@nestjs/testing'
import {PermissionResolver} from './permission.resolver'
import {PermissionService} from '../services/permission.service'
import {CreatePermissionInput} from '../dto/create-permission.input'
import {UpdatePermissionInput} from '../dto/update-permission.input'
import {PermissionInput} from '../dto/permission.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'

describe('PermissionResolver', () => {
  let resolver: PermissionResolver
  let service: PermissionService

  const mockPermissionService = {
    createPermission: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    deleteById: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionResolver,
        {
          provide: PermissionService,
          useValue: mockPermissionService,
        },
      ],
    }).compile()

    resolver = module.get<PermissionResolver>(PermissionResolver)
    service = module.get<PermissionService>(PermissionService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createPermission', () => {
    it('should create a new permission successfully', async () => {
      const createInput: CreatePermissionInput = {
        name: 'Test Permission',
        description: 'Test Description',
        aplications_id: 1,
        module_aplication_id: 1,
        created_usr: 1,
        created_at: new Date(),
      }

      const expectedResult: PermissionInput = {
        id_permission: 1,
        name: 'Test Permission',
        description: 'Test Description',
        aplications_id: 1,
        module_aplication_id: 1,
      } as PermissionInput

      mockPermissionService.createPermission.mockResolvedValue(expectedResult)

      const result = await resolver.createPermission(createInput)

      expect(service.createPermission).toHaveBeenCalledWith(createInput)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during creation', async () => {
      const createInput: CreatePermissionInput = {
        name: 'Test Permission',
        description: 'Test Description',
        aplications_id: 1,
        module_aplication_id: 1,
        created_usr: 1,
        created_at: new Date(),
      }

      const mockError = new Error('Service error')
      mockPermissionService.createPermission.mockRejectedValue(mockError)

      await expect(resolver.createPermission(createInput)).rejects.toThrow(mockError)
      expect(service.createPermission).toHaveBeenCalledWith(createInput)
    })
  })

  describe('findAllPermissions', () => {
    it('should return all permissions', async () => {
      const expectedResult: PermissionInput[] = [
        {
          id_permission: 1,
          name: 'Permission 1',
          description: 'Description 1',
          aplications_id: 1,
        },
        {
          id_permission: 2,
          name: 'Permission 2',
          description: 'Description 2',
          aplications_id: 1,
        },
      ] as PermissionInput[]

      mockPermissionService.findAll.mockResolvedValue(expectedResult)

      const result = await resolver.findAllPermissions()

      expect(service.findAll).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during findAll', async () => {
      const mockError = new Error('Service error')
      mockPermissionService.findAll.mockRejectedValue(mockError)

      await expect(resolver.findAllPermissions()).rejects.toThrow(mockError)
      expect(service.findAll).toHaveBeenCalled()
    })
  })

  describe('findOnePermission', () => {
    it('should return a permission by id', async () => {
      const id = 1
      const expectedResult: PermissionInput = {
        id_permission: 1,
        name: 'Test Permission',
        description: 'Test Description',
        aplications_id: 1,
      } as PermissionInput

      mockPermissionService.findOne.mockResolvedValue(expectedResult)

      const result = await resolver.findOnePermission(id)

      expect(service.findOne).toHaveBeenCalledWith(id)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during findOne', async () => {
      const id = 1
      const mockError = new Error('Service error')
      mockPermissionService.findOne.mockRejectedValue(mockError)

      await expect(resolver.findOnePermission(id)).rejects.toThrow(mockError)
      expect(service.findOne).toHaveBeenCalledWith(id)
    })
  })

  describe('updatePermission', () => {
    it('should update a permission successfully', async () => {
      const updateInput: UpdatePermissionInput = {
        id_permission: 1,
        name: 'Updated Permission',
        description: 'Updated Description',
      }

      const expectedResult: UpdateResultInput = {affected: 1} as UpdateResultInput

      mockPermissionService.update.mockResolvedValue(expectedResult)

      const result = await resolver.updatePermission(updateInput)

      expect(service.update).toHaveBeenCalledWith(updateInput.id_permission, updateInput)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during update', async () => {
      const updateInput: UpdatePermissionInput = {
        id_permission: 1,
        name: 'Updated Permission',
      }

      const mockError = new Error('Service error')
      mockPermissionService.update.mockRejectedValue(mockError)

      await expect(resolver.updatePermission(updateInput)).rejects.toThrow(mockError)
      expect(service.update).toHaveBeenCalledWith(updateInput.id_permission, updateInput)
    })
  })

  describe('removePermission', () => {
    it('should remove a permission successfully', async () => {
      const id = 1
      const expectedResult: UpdateResultInput = {affected: 1} as UpdateResultInput

      mockPermissionService.deleteById.mockResolvedValue(expectedResult)

      const result = await resolver.removePermission(id)

      expect(service.deleteById).toHaveBeenCalledWith(id)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during removal', async () => {
      const id = 1
      const mockError = new Error('Service error')
      mockPermissionService.deleteById.mockRejectedValue(mockError)

      await expect(resolver.removePermission(id)).rejects.toThrow(mockError)
      expect(service.deleteById).toHaveBeenCalledWith(id)
    })
  })

  describe('GraphQL decorators', () => {
    it('should have correct GraphQL decorators', () => {
      const metadata = Reflect.getMetadata('graphql:resolver_type', PermissionResolver)
      expect(metadata).toBeDefined()
    })

    it('should have correct mutation decorators', () => {
      const createMetadata = Reflect.getMetadata('graphql:mutation', resolver.createPermission)
      const updateMetadata = Reflect.getMetadata('graphql:mutation', resolver.updatePermission)
      const removeMetadata = Reflect.getMetadata('graphql:mutation', resolver.removePermission)

      expect(createMetadata).toBeDefined()
      expect(updateMetadata).toBeDefined()
      expect(removeMetadata).toBeDefined()
    })

    it('should have correct query decorators', () => {
      const findAllMetadata = Reflect.getMetadata('graphql:query', resolver.findAllPermissions)
      const findOneMetadata = Reflect.getMetadata('graphql:query', resolver.findOnePermission)

      expect(findAllMetadata).toBeDefined()
      expect(findOneMetadata).toBeDefined()
    })
  })
})
