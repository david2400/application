import {Test, TestingModule} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {AplicationsService} from './aplications.service'
import {Aplications} from '../entities/aplications.entity'
import {CreateAplicationsInput} from '../dto/create-aplication.input'
import {UpdateAplicationsInput} from '../dto/update-aplication.input'
import {AplicationsInput} from '../dto/aplications.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'
import {HttpException, HttpStatus} from '@nestjs/common'
import {Mapper} from '@/common/mapper'

describe('AplicationsService', () => {
  let service: AplicationsService
  let repository: Repository<Aplications>

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
        AplicationsService,
        {
          provide: getRepositoryToken(Aplications),
          useValue: mockRepository,
        },
        {
          provide: 'DataSource',
          useValue: {
            getMetadata: jest.fn(() => ({
              columns: [{isPrimary: true, isGenerated: true, databaseName: 'id_aplications'}],
            })),
          },
        },
      ],
    }).compile()

    service = module.get<AplicationsService>(AplicationsService)
    repository = module.get<Repository<Aplications>>(getRepositoryToken(Aplications))

    // Mock Mapper globally
    jest.spyOn(Mapper, 'create').mockReturnValue(mockMapper.create() as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createAplication', () => {
    it('should create a new application successfully', async () => {
      const createInput: CreateAplicationsInput = {
        name: 'Test Application',
        description: 'Test Description',
        route: 'hola/test',
        // url: 'https://test.com',
        // icon: 'test-icon',
        // color: '#000000',
        created_usr: 1,
        created_at: new Date(),
      }

      const mockApplication = {id_aplications: 1, ...createInput} as Aplications
      const mockSavedApplication = {id_aplications: 1, ...createInput} as Aplications
      const mockApplicationInput = {id_aplications: 1, ...createInput} as AplicationsInput

      mockRepository.create.mockReturnValue(mockApplication)
      mockRepository.save.mockResolvedValue(mockSavedApplication)
      mockMapper.create().entityToDto.mockReturnValue(mockApplicationInput)

      const result = await service.createAplication(createInput)

      expect(repository.create).toHaveBeenCalledWith(createInput)
      expect(repository.save).toHaveBeenCalledWith(mockApplication)
      expect(result).toEqual(mockApplicationInput)
    })

    it('should handle errors during creation', async () => {
      const createInput: CreateAplicationsInput = {
        name: 'Test Application',
        description: 'Test Description',
        route: 'hola/test',
        // url: 'https://test.com',
        // icon: 'test-icon',
        // color: '#000000',
        created_usr: 1,
        created_at: new Date(),
      }

      const mockError = new Error('Database error')
      mockRepository.create.mockReturnValue({})
      mockRepository.save.mockRejectedValue(mockError)

      const result = await service.createAplication(createInput)

      expect(result).toBe(mockError)
    })
  })

  describe('updateAplication', () => {
    it('should update an application successfully', async () => {
      const id = 1
      const updateInput: UpdateAplicationsInput = {
        id_aplications: id,
        name: 'Test Application',
        description: 'Test Description',
        route: 'hola/test',
        // url: 'https://test.com',
        // icon: 'test-icon',
        // color: '#000000',
      }

      const existingApplication = {
        name: 'Test Application',
        description: 'Test Description',
        route: 'hola/test',
        // url: 'https://test.com',
        // icon: 'test-icon',
        // color: '#000000',
        created_usr: 1,
        created_at: new Date(),
      } as Aplications

      const mockUpdateResult = {affected: 1} as any

      mockRepository.findOneById.mockResolvedValue(existingApplication)
      mockRepository.merge.mockImplementation((entity, update) => Object.assign(entity, update))
      mockRepository.update.mockResolvedValue(mockUpdateResult)

      const result = await service.updateAplication(id, updateInput)

      expect(repository.findOneById).toHaveBeenCalledWith(id)
      expect(repository.merge).toHaveBeenCalledWith(existingApplication, updateInput)
      expect(repository.update).toHaveBeenCalledWith(id, existingApplication)
      expect(result).toEqual(mockUpdateResult)
    })

    it('should throw HttpException when application does not exist', async () => {
      const id = 1
      const updateInput: UpdateAplicationsInput = {
        id_aplications: id,
        name: 'Updated Application',
      }

      mockRepository.findOneById.mockResolvedValue(null)

      await expect(service.updateAplication(id, updateInput)).rejects.toThrow(
        new HttpException(
          {message: 'The subcategory does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      )
    })

    it('should throw HttpException when update affects no rows', async () => {
      const id = 1
      const updateInput: UpdateAplicationsInput = {
        id_aplications: id,

        name: 'Updated Application',
      }

      const existingApplication = {id_aplications: 1, name: 'Old Application'} as Aplications
      const mockUpdateResult = {affected: 0} as any

      mockRepository.findOneById.mockResolvedValue(existingApplication)
      mockRepository.merge.mockImplementation((entity, update) => Object.assign(entity, update))
      mockRepository.update.mockResolvedValue(mockUpdateResult)

      await expect(service.updateAplication(id, updateInput)).rejects.toThrow(
        new HttpException(
          {message: 'The Aplication does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      )
    })

    it('should handle errors during update', async () => {
      const id = 1
      const updateInput: UpdateAplicationsInput = {
        id_aplications: id,
        name: 'Updated Application',
      }

      const mockError = new Error('Database error')
      mockRepository.findOneById.mockRejectedValue(mockError)

      const result = await service.updateAplication(id, updateInput)

      expect(result).toBe(mockError)
    })
  })

  describe('findOne', () => {
    it('should find an application by id', async () => {
      const id = 1
      const mockApplication = {id_aplications: 1, name: 'Test Application'} as Aplications
      const mockApplicationInput = {id_aplications: 1, name: 'Test Application'} as AplicationsInput

      mockRepository.findOne.mockResolvedValue(mockApplication)
      mockMapper.create().entityToDto.mockReturnValue(mockApplicationInput)

      const result = await service.findOne(id)

      expect(repository.findOne).toHaveBeenCalledWith({
        where: {id_aplications: id},
      })
      expect(result).toEqual(mockApplicationInput)
    })
  })

  describe('findAll', () => {
    it('should return all applications', async () => {
      const mockApplications = [
        {id_aplications: 1, name: 'Application 1'},
        {id_aplications: 2, name: 'Application 2'},
      ] as Aplications[]

      const mockApplicationInputs = [
        {id_aplications: 1, name: 'Application 1'},
        {id_aplications: 2, name: 'Application 2'},
      ] as AplicationsInput[]

      mockRepository.find.mockResolvedValue(mockApplications)
      mockMapper.create().convertToListDto.mockReturnValue(mockApplicationInputs)

      const result = await service.findAll()

      expect(repository.find).toHaveBeenCalledWith({withDeleted: true})
      expect(result).toEqual(mockApplicationInputs)
    })
  })

  describe('deleteById', () => {
    it('should delete an application by id', async () => {
      const id = 1
      const mockDeleteResult = {affected: 1} as any

      mockRepository.softDelete.mockResolvedValue(mockDeleteResult)

      const result = await service.deleteById(id)

      expect(repository.softDelete).toHaveBeenCalledWith({id_aplications: id})
      expect(result).toEqual(mockDeleteResult)
    })

    it('should throw HttpException when application does not exist for deletion', async () => {
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
    it('should restore a deleted application', async () => {
      const id = 1
      const mockApplication = {id_aplications: 1, name: 'Test Application'} as Aplications
      const mockApplicationInput = {id_aplications: 1, name: 'Test Application'} as AplicationsInput

      mockRepository.recover.mockResolvedValue(mockApplication)
      mockMapper.create().entityToDto.mockReturnValue(mockApplicationInput)

      const result = await service.restoreById(id)

      expect(repository.recover).toHaveBeenCalledWith({id_aplications: id})
      expect(result).toEqual(mockApplicationInput)
    })

    it('should throw HttpException when application does not exist for restoration', async () => {
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

      expect(result).toBe('id_aplications')
    })
  })
})
