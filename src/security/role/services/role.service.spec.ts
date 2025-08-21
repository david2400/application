import {Test, TestingModule} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {RoleService} from './role.service'
import {Role} from '../entities/role.entity'
import {CreateRoleInput} from '../dto/create-role.input'
import {UpdateRoleInput} from '../dto/update-role.input'
import {RoleInput} from '../dto/role.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'
import {HttpException, HttpStatus} from '@nestjs/common'
import {Mapper} from '@/common/mapper'

describe('RoleService', () => {
  let service: RoleService
  let repository: Repository<Role>

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
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRepository,
        },
        {
          provide: 'DataSource',
          useValue: {
            getMetadata: jest.fn(() => ({
              columns: [{isPrimary: true, isGenerated: true, databaseName: 'id_role'}],
            })),
          },
        },
      ],
    }).compile()

    service = module.get<RoleService>(RoleService)
    repository = module.get<Repository<Role>>(getRepositoryToken(Role))

    // Mock Mapper globally
    jest.spyOn(Mapper, 'create').mockReturnValue(mockMapper.create() as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
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

      const mockRole = {id_role: 1, ...createInput} as Role
      const mockSavedRole = {id_role: 1, ...createInput} as Role
      const mockRoleInput = {id_role: 1, ...createInput} as RoleInput

      mockRepository.create.mockReturnValue(mockRole)
      mockRepository.save.mockResolvedValue(mockSavedRole)
      mockMapper.create().entityToDto.mockReturnValue(mockRoleInput)

      const result = await service.createRole(createInput)

      expect(repository.create).toHaveBeenCalledWith(createInput)
      expect(repository.save).toHaveBeenCalledWith(mockRole)
      expect(result).toEqual(mockRoleInput)
    })

    it('should handle errors during creation', async () => {
      const createInput: CreateRoleInput = {
        name: 'Test Role',
        description: 'Test Description',
        // aplications_id: 1,
        // module_aplication_id: 1,
        created_usr: 1,
      }

      const mockError = new Error('Database error')
      mockRepository.create.mockReturnValue({})
      mockRepository.save.mockRejectedValue(mockError)

      const result = await service.createRole(createInput)

      expect(result).toBe(mockError)
    })
  })

  describe('updateRole', () => {
    it('should update a role successfully', async () => {
      const id = 1
      const updateInput: UpdateRoleInput = {
        id_role: id,
        name: 'Updated Role',
        description: 'Updated Description',
      }

      const existingRole = {
        id_role: 1,
        name: 'Old Role',
        description: 'Old Description',
        // aplications_id: 1,
        // created_usr: 1,
      } as Role

      const mockUpdateResult = {affected: 1} as any

      mockRepository.findOneById.mockResolvedValue(existingRole)
      mockRepository.merge.mockImplementation((entity, update) => Object.assign(entity, update))
      mockRepository.update.mockResolvedValue(mockUpdateResult)

      const result = await service.updateRole(id, updateInput)

      expect(repository.findOneById).toHaveBeenCalledWith(id)
      expect(repository.merge).toHaveBeenCalledWith(existingRole, updateInput)
      expect(repository.update).toHaveBeenCalledWith(id, existingRole)
      expect(result).toEqual(mockUpdateResult)
    })

    it('should throw HttpException when role does not exist', async () => {
      const id = 1
      const updateInput: UpdateRoleInput = {
        id_role: id,
        name: 'Updated Role',
      }

      mockRepository.findOneById.mockResolvedValue(null)

      await expect(service.updateRole(id, updateInput)).rejects.toThrow(
        new HttpException(
          {message: 'The subcategory does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      )
    })

    it('should throw HttpException when update affects no rows', async () => {
      const id = 1
      const updateInput: UpdateRoleInput = {
        id_role: id,
        name: 'Updated Role',
      }

      const existingRole = {id_role: 1, name: 'Old Role'} as Role
      const mockUpdateResult = {affected: 0} as any

      mockRepository.findOneById.mockResolvedValue(existingRole)
      mockRepository.merge.mockImplementation((entity, update) => Object.assign(entity, update))
      mockRepository.update.mockResolvedValue(mockUpdateResult)

      await expect(service.updateRole(id, updateInput)).rejects.toThrow(
        new HttpException(
          {message: 'The role does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      )
    })

    it('should handle errors during update', async () => {
      const id = 1
      const updateInput: UpdateRoleInput = {
        id_role: id,
        name: 'Updated Role',
      }

      const mockError = new Error('Database error')
      mockRepository.findOneById.mockRejectedValue(mockError)

      const result = await service.updateRole(id, updateInput)

      expect(result).toBe(mockError)
    })
  })

  describe('findOne', () => {
    it('should find a role by id', async () => {
      const id = 1
      const mockRole = {id_role: 1, name: 'Test Role'} as Role
      const mockRoleInput = {id_role: 1, name: 'Test Role'} as RoleInput

      mockRepository.findOne.mockResolvedValue(mockRole)
      mockMapper.create().entityToDto.mockReturnValue(mockRoleInput)

      const result = await service.findOne(id)

      expect(repository.findOne).toHaveBeenCalledWith({
        where: {id_role: id},
      })
      expect(result).toEqual(mockRoleInput)
    })
  })

  describe('findAll', () => {
    it('should return all roles', async () => {
      const mockRoles = [
        {id_role: 1, name: 'Role 1'},
        {id_role: 2, name: 'Role 2'},
      ] as Role[]

      const mockRoleInputs = [
        {id_role: 1, name: 'Role 1'},
        {id_role: 2, name: 'Role 2'},
      ] as RoleInput[]

      mockRepository.find.mockResolvedValue(mockRoles)
      mockMapper.create().convertToListDto.mockReturnValue(mockRoleInputs)

      const result = await service.findAll()

      expect(repository.find).toHaveBeenCalledWith({withDeleted: true})
      expect(result).toEqual(mockRoleInputs)
    })
  })

  describe('deleteById', () => {
    it('should delete a role by id', async () => {
      const id = 1
      const mockDeleteResult = {affected: 1} as any

      mockRepository.softDelete.mockResolvedValue(mockDeleteResult)

      const result = await service.deleteById(id)

      expect(repository.softDelete).toHaveBeenCalledWith({id_role: id})
      expect(result).toEqual(mockDeleteResult)
    })

    it('should throw HttpException when role does not exist for deletion', async () => {
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
    it('should restore a deleted role', async () => {
      const id = 1
      const mockRole = {id_role: 1, name: 'Test Role'} as Role
      const mockRoleInput = {id_role: 1, name: 'Test Role'} as RoleInput

      mockRepository.recover.mockResolvedValue(mockRole)
      mockMapper.create().entityToDto.mockReturnValue(mockRoleInput)

      const result = await service.restoreById(id)

      expect(repository.recover).toHaveBeenCalledWith({id_role: id})
      expect(result).toEqual(mockRoleInput)
    })

    it('should throw HttpException when role does not exist for restoration', async () => {
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

      expect(result).toBe('id_role')
    })
  })
})
