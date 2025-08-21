import {Test, TestingModule} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {PermissionService} from './permission.service'
import {Permission} from '../entities/permission.entity'
import {CreatePermissionInput} from '../dto/create-permission.input'
import {UpdatePermissionInput} from '../dto/update-permission.input'
import {PermissionInput} from '../dto/permission.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'
import {HttpException, HttpStatus, NotFoundException} from '@nestjs/common'
import {Mapper} from '@/common/mapper'

describe('PermissionService', () => {
  let service: PermissionService
  let repository: Repository<Permission>

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
        PermissionService,
        {
          provide: getRepositoryToken(Permission),
          useValue: mockRepository,
        },
        {
          provide: 'DataSource',
          useValue: {
            getMetadata: jest.fn(() => ({
              columns: [{isPrimary: true, isGenerated: true, databaseName: 'id_permission'}],
            })),
          },
        },
      ],
    }).compile()

    service = module.get<PermissionService>(PermissionService)
    repository = module.get<Repository<Permission>>(getRepositoryToken(Permission))

    // Mock Mapper globally
    jest.spyOn(Mapper, 'create').mockReturnValue(mockMapper.create() as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
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

      const mockPermission = {id_permission: 1, ...createInput} as Permission
      const mockSavedPermission = {id_permission: 1, ...createInput} as Permission
      const mockPermissionInput = {id_permission: 1, ...createInput} as PermissionInput

      mockRepository.create.mockReturnValue(mockPermission)
      mockRepository.save.mockResolvedValue(mockSavedPermission)
      mockMapper.create().entityToDto.mockReturnValue(mockPermissionInput)

      const result = await service.createPermission(createInput)

      expect(repository.create).toHaveBeenCalledWith(createInput)
      expect(repository.save).toHaveBeenCalledWith(mockPermission)
      expect(result).toEqual(mockPermissionInput)
    })

    it('should handle errors during creation', async () => {
      const createInput: CreatePermissionInput = {
        name: 'Test Permission',
        description: 'Test Description',
        aplications_id: 1,
        module_aplication_id: 1,
        created_usr: 1,
        created_at: new Date(),
      }

      const mockError = new Error('Database error')
      mockRepository.create.mockReturnValue({})
      mockRepository.save.mockRejectedValue(mockError)

      const result = await service.createPermission(createInput)

      expect(result).toBe(mockError)
    })
  })

  describe('update', () => {
    it('should update a permission successfully', async () => {
      const id = 1
      const updateInput: UpdatePermissionInput = {
        id_permission: 1,
        name: 'Updated Permission',
        description: 'Updated Description',
      }

      const existingPermission = {
        id_permission: 1,
        name: 'Old Permission',
        description: 'Old Description',
        aplications_id: 1,
      } as Permission

      const mockUpdateResult = {affected: 1} as any

      mockRepository.findOneById.mockResolvedValue(existingPermission)
      mockRepository.merge.mockImplementation((entity, update) => Object.assign(entity, update))
      mockRepository.update.mockResolvedValue(mockUpdateResult)

      const result = await service.update(id, updateInput)

      expect(repository.findOneById).toHaveBeenCalledWith(id)
      expect(repository.merge).toHaveBeenCalledWith(existingPermission, updateInput)
      expect(repository.update).toHaveBeenCalledWith(id, existingPermission)
      expect(result).toEqual(mockUpdateResult)
    })

    it('should throw HttpException when permission does not exist', async () => {
      const id = 1
      const updateInput: UpdatePermissionInput = {
        id_permission: 1,
        name: 'Updated Permission',
      }

      mockRepository.findOneById.mockResolvedValue(null)

      await expect(service.update(id, updateInput)).rejects.toThrow(
        new HttpException(
          {message: 'The permission does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      )
    })

    it('should throw NotFoundException when update affects no rows', async () => {
      const id = 1
      const updateInput: UpdatePermissionInput = {
        id_permission: 1,
        name: 'Updated Permission',
      }

      const existingPermission = {id_permission: 1, name: 'Old Permission'} as Permission
      const mockUpdateResult = {affected: 0} as any

      mockRepository.findOneById.mockResolvedValue(existingPermission)
      mockRepository.merge.mockImplementation((entity, update) => Object.assign(entity, update))
      mockRepository.update.mockResolvedValue(mockUpdateResult)

      await expect(service.update(id, updateInput)).rejects.toThrow(
        new NotFoundException('motiveDevolution does not exist or could not be modify')
      )
    })

    it('should handle errors during update', async () => {
      const id = 1
      const updateInput: UpdatePermissionInput = {
        id_permission: 1,
        name: 'Updated Permission',
      }

      const mockError = new Error('Database error')
      mockRepository.findOneById.mockRejectedValue(mockError)

      const result = await service.update(id, updateInput)

      expect(result).toBe(mockError)
    })
  })

  describe('findOne', () => {
    it('should find a permission by id', async () => {
      const id = 1
      const mockPermission = {id_permission: 1, name: 'Test Permission'} as Permission
      const mockPermissionInput = {id_permission: 1, name: 'Test Permission'} as PermissionInput

      mockRepository.findOne.mockResolvedValue(mockPermission)
      mockMapper.create().entityToDto.mockReturnValue(mockPermissionInput)

      const result = await service.findOne(id)

      expect(repository.findOne).toHaveBeenCalledWith({
        where: {id_permission: id},
      })
      expect(result).toEqual(mockPermissionInput)
    })
  })

  describe('findAll', () => {
    it('should return all permissions', async () => {
      const mockPermissions = [
        {id_permission: 1, name: 'Permission 1'},
        {id_permission: 2, name: 'Permission 2'},
      ] as Permission[]

      const mockPermissionInputs = [
        {id_permission: 1, name: 'Permission 1'},
        {id_permission: 2, name: 'Permission 2'},
      ] as PermissionInput[]

      mockRepository.find.mockResolvedValue(mockPermissions)
      mockMapper.create().convertToListDto.mockReturnValue(mockPermissionInputs)

      const result = await service.findAll()

      expect(repository.find).toHaveBeenCalledWith({withDeleted: true})
      expect(result).toEqual(mockPermissionInputs)
    })
  })

  describe('deleteById', () => {
    it('should delete a permission by id', async () => {
      const id = 1
      const mockDeleteResult = {affected: 1} as any

      mockRepository.softDelete.mockResolvedValue(mockDeleteResult)

      const result = await service.deleteById(id)

      expect(repository.softDelete).toHaveBeenCalledWith({id_permission: id})
      expect(result).toEqual(mockDeleteResult)
    })

    it('should throw HttpException when permission does not exist for deletion', async () => {
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
    it('should restore a deleted permission', async () => {
      const id = 1
      const mockPermission = {id_permission: 1, name: 'Test Permission'} as Permission
      const mockPermissionInput = {id_permission: 1, name: 'Test Permission'} as PermissionInput

      mockRepository.recover.mockResolvedValue(mockPermission)
      mockMapper.create().entityToDto.mockReturnValue(mockPermissionInput)

      const result = await service.restoreById(id)

      expect(repository.recover).toHaveBeenCalledWith({id_permission: id})
      expect(result).toEqual(mockPermissionInput)
    })

    it('should throw HttpException when permission does not exist for restoration', async () => {
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

      expect(result).toBe('id_permission')
    })
  })
})
