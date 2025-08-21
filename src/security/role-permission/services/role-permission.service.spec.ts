import {Test, TestingModule} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {RolePermissionService} from './role-permission.service'
import {RolePermission} from '../entities/role-permission.entity'
import {CreateRolePermissionInput} from '../dto/create-role-permission.input'
import {UpdateRolePermissionInput} from '../dto/update-role-permission.input'
import {RolePermissionInput} from '../dto/role-permission.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'
import {HttpException, HttpStatus, NotFoundException} from '@nestjs/common'
import {Mapper} from '@/common/mapper'

describe('RolePermissionService', () => {
  let service: RolePermissionService
  let repository: Repository<RolePermission>

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOneById: jest.fn(),
    merge: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    softDelete: jest.fn(),
    recover: jest.fn(),
    findByIds: jest.fn(),
  }

  const mockMapper = {
    create: jest.fn(() => ({
      entityToDto: jest.fn(),
      convertToListDto: jest.fn(),
    })),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolePermissionService,
        {
          provide: getRepositoryToken(RolePermission),
          useValue: mockRepository,
        },
        {
          provide: 'DataSource',
          useValue: {
            getMetadata: jest.fn(() => ({
              columns: [{isPrimary: true, isGenerated: true, databaseName: 'id_role_permission'}],
            })),
          },
        },
      ],
    }).compile()

    service = module.get<RolePermissionService>(RolePermissionService)
    repository = module.get<Repository<RolePermission>>(getRepositoryToken(RolePermission))

    // Mock Mapper globally
    jest.spyOn(Mapper, 'create').mockReturnValue(mockMapper.create() as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createRolePermission', () => {
    it('should create a new role permission successfully', async () => {
      const createInput: CreateRolePermissionInput = {
        role_id: 1,
        permission_id: 1,
        level: '1',

        created_usr: 1,
        created_at: new Date(),
      }

      const mockRolePermission = {...createInput} as RolePermission
      const mockSavedRolePermission = {...createInput} as RolePermission
      const mockRolePermissionInput = {...createInput} as RolePermissionInput

      mockRepository.create.mockReturnValue(mockRolePermission)
      mockRepository.save.mockResolvedValue(mockSavedRolePermission)
      mockMapper.create().entityToDto.mockReturnValue(mockRolePermissionInput)

      const result = await service.createRolePermission(createInput)

      expect(repository.create).toHaveBeenCalledWith(createInput)
      expect(repository.save).toHaveBeenCalledWith(mockRolePermission)
      expect(result).toEqual(mockRolePermissionInput)
    })

    it('should handle errors during creation', async () => {
      const createInput: CreateRolePermissionInput = {
        role_id: 1,
        permission_id: 1,
        level: '1',
        created_usr: 1,
        created_at: new Date(),
      }

      const mockError = new Error('Database error')
      mockRepository.create.mockReturnValue({})
      mockRepository.save.mockRejectedValue(mockError)

      const result = await service.createRolePermission(createInput)

      expect(result).toBe(mockError)
    })
  })

  describe('updateRolePermission', () => {
    it('should update a role permission successfully', async () => {
      const id = 1
      const updateInput: UpdateRolePermissionInput = {
        role_id: 1,
        permission_id: 2,
      }

      const existingRolePermission = {
        role_id: 1,
        level: '1',
        permission_id: 1,
        created_usr: 1,
        created_at: new Date(),
      } as RolePermission

      const mockUpdateResult = {affected: 1} as any

      mockRepository.findOneById.mockResolvedValue(existingRolePermission)
      mockRepository.merge.mockImplementation((entity, update) => Object.assign(entity, update))
      mockRepository.update.mockResolvedValue(mockUpdateResult)

      const result = await service.updateRolePermission(id, updateInput)

      expect(repository.findOneById).toHaveBeenCalledWith(id)
      expect(repository.merge).toHaveBeenCalledWith(existingRolePermission, updateInput)
      expect(repository.update).toHaveBeenCalledWith(id, existingRolePermission)
      expect(result).toEqual(mockUpdateResult)
    })

    it('should throw HttpException when role permission does not exist', async () => {
      const id = 1
      const updateInput: UpdateRolePermissionInput = {
        role_id: 1,
        permission_id: 2,
      }

      mockRepository.findOneById.mockResolvedValue(null)

      await expect(service.updateRolePermission(id, updateInput)).rejects.toThrow(
        new HttpException(
          {message: 'The role permission does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      )
    })

    it('should throw NotFoundException when update affects no rows', async () => {
      const id = 1
      const updateInput: UpdateRolePermissionInput = {
        role_id: 1,
        permission_id: 2,
      }

      const existingRolePermission = {
        role_id: 1,
        level: '1',
        permission_id: 1,
      } as RolePermission
      const mockUpdateResult = {affected: 0} as any

      mockRepository.findOneById.mockResolvedValue(existingRolePermission)
      mockRepository.merge.mockImplementation((entity, update) => Object.assign(entity, update))
      mockRepository.update.mockResolvedValue(mockUpdateResult)

      await expect(service.updateRolePermission(id, updateInput)).rejects.toThrow(
        new NotFoundException('motiveDevolution does not exist or could not be modify')
      )
    })

    it('should handle errors during update', async () => {
      const id = 1
      const updateInput: UpdateRolePermissionInput = {
        role_id: 1,
        permission_id: 2,
      }

      const mockError = new Error('Database error')
      mockRepository.findOneById.mockRejectedValue(mockError)

      const result = await service.updateRolePermission(id, updateInput)

      expect(result).toBe(mockError)
    })
  })

  // Tests for inherited GenericService methods
  describe('findOne', () => {
    it('should find a role permission by id', async () => {
      const id = 1
      const mockRolePermission = {
        role_id: 1,
        permission_id: 1,
      } as RolePermission
      const mockRolePermissionInput = {
        role_id: 1,
        permission_id: 1,
      } as RolePermissionInput

      mockRepository.findOne.mockResolvedValue(mockRolePermission)
      mockMapper.create().entityToDto.mockReturnValue(mockRolePermissionInput)

      const result = await service.findOne(id)

      expect(repository.findOne).toHaveBeenCalledWith({
        where: {id_role_permission: id},
      })
      expect(result).toEqual(mockRolePermissionInput)
    })
  })

  describe('findAll', () => {
    it('should return all role permissions', async () => {
      const mockRolePermissions = [
        {role_id: 1, permission_id: 1},
        {id_role_permission: 2, role_id: 1, permission_id: 2},
      ] as RolePermission[]

      const mockRolePermissionInputs = [
        {role_id: 1, permission_id: 1},
        {id_role_permission: 2, role_id: 1, permission_id: 2},
      ] as RolePermissionInput[]

      mockRepository.find.mockResolvedValue(mockRolePermissions)
      mockMapper.create().convertToListDto.mockReturnValue(mockRolePermissionInputs)

      const result = await service.findAll()

      expect(repository.find).toHaveBeenCalledWith({withDeleted: true})
      expect(result).toEqual(mockRolePermissionInputs)
    })
  })

  describe('deleteById', () => {
    it('should delete a role permission by id', async () => {
      const id = 1
      const mockDeleteResult = {affected: 1} as any

      mockRepository.softDelete.mockResolvedValue(mockDeleteResult)

      const result = await service.deleteById(id)

      expect(repository.softDelete).toHaveBeenCalledWith({id_role_permission: id})
      expect(result).toEqual(mockDeleteResult)
    })

    it('should throw HttpException when role permission does not exist for deletion', async () => {
      const id = 1
      const mockDeleteResult = {affected: 0} as any

      mockRepository.softDelete.mockResolvedValue(mockDeleteResult)

      await expect(service.deleteById(id)).rejects.toThrow(
        new HttpException(
          'MotiveDevolution does not exist or could not be deleted!',
          HttpStatus.NOT_FOUND
        )
      )
    })
  })

  describe('restoreById', () => {
    it('should restore a deleted role permission', async () => {
      const id = 1
      const mockRolePermission = {
        role_id: 1,
        permission_id: 1,
      } as RolePermission
      const mockRolePermissionInput = {
        role_id: 1,
        permission_id: 1,
      } as RolePermissionInput

      mockRepository.recover.mockResolvedValue(mockRolePermission)
      mockMapper.create().entityToDto.mockReturnValue(mockRolePermissionInput)

      const result = await service.restoreById(id)

      expect(repository.recover).toHaveBeenCalledWith({id_role_permission: id})
      expect(result).toEqual(mockRolePermissionInput)
    })

    it('should throw HttpException when role permission does not exist for restoration', async () => {
      const id = 1

      mockRepository.recover.mockResolvedValue(null)

      await expect(service.restoreById(id)).rejects.toThrow(
        new HttpException(
          {message: 'Register does not exist or could not be restored!'},
          HttpStatus.NOT_FOUND
        )
      )
    })
  })

  describe('getPrimaryGeneratedColumnName', () => {
    it('should return the correct primary column name', () => {
      const result = service.getPrimaryGeneratedColumnName()

      expect(result).toBe('id_role_permission')
    })
  })
})
