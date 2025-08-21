import {Test, TestingModule} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {ModulesAplicationsService} from './modules-aplications.service'
import {ModulesAplication} from '../entities/modules-aplication.entity'
import {CreateModulesAplicationInput} from '../dto/create-modules-aplication.input'
import {UpdateModulesAplicationInput} from '../dto/update-modules-aplication.input'
import {ModulesAplicationInput} from '../dto/modules-aplication.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'
import {HttpException, HttpStatus, NotFoundException} from '@nestjs/common'
import {Mapper} from '@/common/mapper'

describe('ModulesAplicationsService', () => {
  let service: ModulesAplicationsService
  let repository: Repository<ModulesAplication>

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
        ModulesAplicationsService,
        {
          provide: getRepositoryToken(ModulesAplication),
          useValue: mockRepository,
        },
        {
          provide: 'DataSource',
          useValue: {
            getMetadata: jest.fn(() => ({
              columns: [
                {isPrimary: true, isGenerated: true, databaseName: 'id_modules_aplication'},
              ],
            })),
          },
        },
      ],
    }).compile()

    service = module.get<ModulesAplicationsService>(ModulesAplicationsService)
    repository = module.get<Repository<ModulesAplication>>(getRepositoryToken(ModulesAplication))

    // Mock Mapper globally
    jest.spyOn(Mapper, 'create').mockReturnValue(mockMapper.create() as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createModulesAplication', () => {
    it('should create a new module application successfully', async () => {
      const createInput: CreateModulesAplicationInput = {
        name: 'Test Module',
        description: 'Test Description',
        aplication_id: 1,
        created_usr: 1,
        created_at: new Date(),
      }

      const mockModule = {id_modules_aplication: 1, ...createInput} as ModulesAplication
      const mockSavedModule = {id_modules_aplication: 1, ...createInput} as ModulesAplication
      const mockModuleInput = {id_modules_aplication: 1, ...createInput} as ModulesAplicationInput

      mockRepository.create.mockReturnValue(mockModule)
      mockRepository.save.mockResolvedValue(mockSavedModule)
      mockMapper.create().entityToDto.mockReturnValue(mockModuleInput)

      const result = await service.createModulesAplication(createInput)

      expect(repository.create).toHaveBeenCalledWith(createInput)
      expect(repository.save).toHaveBeenCalledWith(mockModule)
      expect(result).toEqual(mockModuleInput)
    })

    it('should handle errors during creation', async () => {
      const createInput: CreateModulesAplicationInput = {
        name: 'Test Module',
        description: 'Test Description',
        aplication_id: 1,
        created_usr: 1,
        created_at: new Date(),
      }

      const mockError = new Error('Database error')
      mockRepository.create.mockReturnValue({})
      mockRepository.save.mockRejectedValue(mockError)

      const result = await service.createModulesAplication(createInput)

      expect(result).toBe(mockError)
    })
  })

  describe('updateModulesAplication', () => {
    it('should update a module application successfully', async () => {
      const id = 1
      const updateInput: UpdateModulesAplicationInput = {
        id_modules_aplication: id,
        name: 'Updated Module',
        description: 'Updated Description',
      }

      const existingModule = {
        id_modules_aplication: 1,
        name: 'Old Module',
        description: 'Old Description',
        created_usr: 1,
        created_at: new Date(),
      } as ModulesAplication

      const mockUpdateResult = {affected: 1} as any

      mockRepository.findOneById.mockResolvedValue(existingModule)
      mockRepository.merge.mockImplementation((entity, update) => Object.assign(entity, update))
      mockRepository.update.mockResolvedValue(mockUpdateResult)

      const result = await service.updateModulesAplication(id, updateInput)

      expect(repository.findOneById).toHaveBeenCalledWith(id)
      expect(repository.merge).toHaveBeenCalledWith(existingModule, updateInput)
      expect(repository.update).toHaveBeenCalledWith(id, existingModule)
      expect(result).toEqual(mockUpdateResult)
    })

    it('should throw HttpException when module application does not exist', async () => {
      const id = 1
      const updateInput: UpdateModulesAplicationInput = {
        id_modules_aplication: id,
        name: 'Updated Module',
      }

      mockRepository.findOneById.mockResolvedValue(null)

      await expect(service.updateModulesAplication(id, updateInput)).rejects.toThrow(
        new HttpException(
          {message: 'The role permission does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      )
    })

    it('should throw NotFoundException when update affects no rows', async () => {
      const id = 1
      const updateInput: UpdateModulesAplicationInput = {
        id_modules_aplication: id,
        name: 'Updated Module',
      }

      const existingModule = {id_modules_aplication: 1, name: 'Old Module'} as ModulesAplication
      const mockUpdateResult = {affected: 0} as any

      mockRepository.findOneById.mockResolvedValue(existingModule)
      mockRepository.merge.mockImplementation((entity, update) => Object.assign(entity, update))
      mockRepository.update.mockResolvedValue(mockUpdateResult)

      await expect(service.updateModulesAplication(id, updateInput)).rejects.toThrow(
        new NotFoundException('motiveDevolution does not exist or could not be modify')
      )
    })

    it('should handle errors during update', async () => {
      const id = 1
      const updateInput: UpdateModulesAplicationInput = {
        id_modules_aplication: id,
        name: 'Updated Module',
      }

      const mockError = new Error('Database error')
      mockRepository.findOneById.mockRejectedValue(mockError)

      const result = await service.updateModulesAplication(id, updateInput)

      expect(result).toBe(mockError)
    })
  })

  // Tests for commented methods that might be uncommented later
  describe('delete (commented method)', () => {
    it('should be implemented when uncommented', () => {
      // This test will be updated when the method is uncommented
      expect(true).toBe(true)
    })
  })

  describe('restore (commented method)', () => {
    it('should be implemented when uncommented', () => {
      // This test will be updated when the method is uncommented
      expect(true).toBe(true)
    })
  })

  // Tests for inherited GenericService methods
  describe('findOne', () => {
    it('should find a module application by id', async () => {
      const id = 1
      const mockModule = {id_modules_aplication: 1, name: 'Test Module'} as ModulesAplication
      const mockModuleInput = {
        id_modules_aplication: 1,
        name: 'Test Module',
      } as ModulesAplicationInput

      mockRepository.findOne.mockResolvedValue(mockModule)
      mockMapper.create().entityToDto.mockReturnValue(mockModuleInput)

      const result = await service.findOne(id)

      expect(repository.findOne).toHaveBeenCalledWith({
        where: {id_modules_aplication: id},
      })
      expect(result).toEqual(mockModuleInput)
    })
  })

  describe('findAll', () => {
    it('should return all module applications', async () => {
      const mockModules = [
        {id_modules_aplication: 1, name: 'Module 1'},
        {id_modules_aplication: 2, name: 'Module 2'},
      ] as ModulesAplication[]

      const mockModuleInputs = [
        {id_modules_aplication: 1, name: 'Module 1'},
        {id_modules_aplication: 2, name: 'Module 2'},
      ] as ModulesAplicationInput[]

      mockRepository.find.mockResolvedValue(mockModules)
      mockMapper.create().convertToListDto.mockReturnValue(mockModuleInputs)

      const result = await service.findAll()

      expect(repository.find).toHaveBeenCalledWith({withDeleted: true})
      expect(result).toEqual(mockModuleInputs)
    })
  })

  describe('deleteById', () => {
    it('should delete a module application by id', async () => {
      const id = 1
      const mockDeleteResult = {affected: 1} as any

      mockRepository.softDelete.mockResolvedValue(mockDeleteResult)

      const result = await service.deleteById(id)

      expect(repository.softDelete).toHaveBeenCalledWith({id_modules_aplication: id})
      expect(result).toEqual(mockDeleteResult)
    })

    it('should throw HttpException when module application does not exist for deletion', async () => {
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
    it('should restore a deleted module application', async () => {
      const id = 1
      const mockModule = {id_modules_aplication: 1, name: 'Test Module'} as ModulesAplication
      const mockModuleInput = {
        id_modules_aplication: 1,
        name: 'Test Module',
      } as ModulesAplicationInput

      mockRepository.recover.mockResolvedValue(mockModule)
      mockMapper.create().entityToDto.mockReturnValue(mockModuleInput)

      const result = await service.restoreById(id)

      expect(repository.recover).toHaveBeenCalledWith({id_modules_aplication: id})
      expect(result).toEqual(mockModuleInput)
    })

    it('should throw HttpException when module application does not exist for restoration', async () => {
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

      expect(result).toBe('id_modules_aplication')
    })
  })
})
