import {Test, TestingModule} from '@nestjs/testing'
import {RoleResolver} from './role.resolver'
import {RoleService} from '../services/role.service'
import {CreateRoleInput} from '../dto/create-role.input'
import {UpdateRoleInput} from '../dto/update-role.input'
import {RoleInput} from '../dto/role.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'

describe('RoleResolver', () => {
  let resolver: RoleResolver
  let service: RoleService

  const mockRoleService = {
    createRole: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateRole: jest.fn(),
    deleteById: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleResolver,
        {
          provide: RoleService,
          useValue: mockRoleService,
        },
      ],
    }).compile()

    resolver = module.get<RoleResolver>(RoleResolver)
    service = module.get<RoleService>(RoleService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createRole', () => {
    it('should create a new role successfully', async () => {
      const createInput: CreateRoleInput = {
        name: 'Test Role',
        description: 'Test Description',
        // aplications_id: 1,
        // module_aplication_id: 1,
        created_usr: 1,
      }

      const expectedResult: RoleInput = {
        id_role: 1,
        name: 'Test Role',
        description: 'Test Description',
        // aplications_id: 1,
        // module_aplication_id: 1,
      } as RoleInput

      mockRoleService.createRole.mockResolvedValue(expectedResult)

      const result = await resolver.createRole(createInput)

      expect(service.createRole).toHaveBeenCalledWith(createInput)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during creation', async () => {
      const createInput: CreateRoleInput = {
        name: 'Test Role',
        description: 'Test Description',
        // aplications_id: 1,
        // module_aplication_id: 1,
        created_usr: 1,
      }

      const mockError = new Error('Service error')
      mockRoleService.createRole.mockRejectedValue(mockError)

      await expect(resolver.createRole(createInput)).rejects.toThrow(mockError)
      expect(service.createRole).toHaveBeenCalledWith(createInput)
    })
  })

  describe('findAllRole', () => {
    it('should return all roles', async () => {
      const expectedResult: RoleInput[] = [
        {
          id_role: 1,
          name: 'Role 1',
          description: 'Description 1',
          // aplications_id: 1,
        },
        {
          id_role: 2,
          name: 'Role 2',
          description: 'Description 2',
          // aplications_id: 1,
        },
      ] as RoleInput[]

      mockRoleService.findAll.mockResolvedValue(expectedResult)

      const result = await resolver.findAllRole()

      expect(service.findAll).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during findAll', async () => {
      const mockError = new Error('Service error')
      mockRoleService.findAll.mockRejectedValue(mockError)

      await expect(resolver.findAllRole()).rejects.toThrow(mockError)
      expect(service.findAll).toHaveBeenCalled()
    })
  })

  describe('findOneRole', () => {
    it('should return a role by id', async () => {
      const id = 1
      const expectedResult: RoleInput = {
        id_role: 1,
        name: 'Test Role',
        description: 'Test Description',
        // aplications_id: 1,
      } as RoleInput

      mockRoleService.findOne.mockResolvedValue(expectedResult)

      const result = await resolver.findOneRole(id)

      expect(service.findOne).toHaveBeenCalledWith(id)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during findOne', async () => {
      const id = 1
      const mockError = new Error('Service error')
      mockRoleService.findOne.mockRejectedValue(mockError)

      await expect(resolver.findOneRole(id)).rejects.toThrow(mockError)
      expect(service.findOne).toHaveBeenCalledWith(id)
    })
  })

  describe('updateRole', () => {
    it('should update a role successfully', async () => {
      const updateInput: UpdateRoleInput = {
        id_role: 1,
        name: 'Updated Role',
        description: 'Updated Description',
      }

      const expectedResult: UpdateResultInput = {affected: 1} as UpdateResultInput

      mockRoleService.updateRole.mockResolvedValue(expectedResult)

      const result = await resolver.updateRole(updateInput)

      expect(service.updateRole).toHaveBeenCalledWith(updateInput.id_role, updateInput)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during update', async () => {
      const updateInput: UpdateRoleInput = {
        id_role: 1,
        name: 'Updated Role',
      }

      const mockError = new Error('Service error')
      mockRoleService.updateRole.mockRejectedValue(mockError)

      await expect(resolver.updateRole(updateInput)).rejects.toThrow(mockError)
      expect(service.updateRole).toHaveBeenCalledWith(updateInput.id_role, updateInput)
    })
  })

  describe('removeRole', () => {
    it('should remove a role successfully', async () => {
      const id = 1
      const expectedResult: UpdateResultInput = {affected: 1} as UpdateResultInput

      mockRoleService.deleteById.mockResolvedValue(expectedResult)

      const result = await resolver.removeRole(id)

      expect(service.deleteById).toHaveBeenCalledWith(id)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during removal', async () => {
      const id = 1
      const mockError = new Error('Service error')
      mockRoleService.deleteById.mockRejectedValue(mockError)

      await expect(resolver.removeRole(id)).rejects.toThrow(mockError)
      expect(service.deleteById).toHaveBeenCalledWith(id)
    })
  })

  describe('GraphQL decorators', () => {
    it('should have correct GraphQL decorators', () => {
      const metadata = Reflect.getMetadata('graphql:resolver_type', RoleResolver)
      expect(metadata).toBeDefined()
    })

    it('should have correct mutation decorators', () => {
      const createMetadata = Reflect.getMetadata('graphql:mutation', resolver.createRole)
      const updateMetadata = Reflect.getMetadata('graphql:mutation', resolver.updateRole)
      const removeMetadata = Reflect.getMetadata('graphql:mutation', resolver.removeRole)

      expect(createMetadata).toBeDefined()
      expect(updateMetadata).toBeDefined()
      expect(removeMetadata).toBeDefined()
    })

    it('should have correct query decorators', () => {
      const findAllMetadata = Reflect.getMetadata('graphql:query', resolver.findAllRole)
      const findOneMetadata = Reflect.getMetadata('graphql:query', resolver.findOneRole)

      expect(findAllMetadata).toBeDefined()
      expect(findOneMetadata).toBeDefined()
    })
  })
})
