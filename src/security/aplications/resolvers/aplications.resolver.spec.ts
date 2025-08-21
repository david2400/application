import {Test, TestingModule} from '@nestjs/testing'
import {AplicationsResolver} from './aplications.resolver'
import {AplicationsService} from '../services/aplications.service'
import {CreateAplicationsInput} from '../dto/create-aplication.input'
import {UpdateAplicationsInput} from '../dto/update-aplication.input'
import {AplicationsInput} from '../dto/aplications.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'

describe('AplicationsResolver', () => {
  let resolver: AplicationsResolver
  let service: AplicationsService

  const mockAplicationsService = {
    createAplication: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateAplication: jest.fn(),
    deleteById: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AplicationsResolver,
        {
          provide: AplicationsService,
          useValue: mockAplicationsService,
        },
      ],
    }).compile()

    resolver = module.get<AplicationsResolver>(AplicationsResolver)
    service = module.get<AplicationsService>(AplicationsService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createAplications', () => {
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

      const expectedResult: AplicationsInput = {
        id_aplications: 1,
        name: 'Test Application',
        description: 'Test Description',
        route: 'hola/test',
        // url: 'https://test.com',
        // icon: 'test-icon',
        // color: '#000000',
        created_usr: 1,
        created_at: new Date(),
      } as AplicationsInput

      mockAplicationsService.createAplication.mockResolvedValue(expectedResult)

      const result = await resolver.createAplications(createInput)

      expect(service.createAplication).toHaveBeenCalledWith(createInput)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during creation', async () => {
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

      const mockError = new Error('Service error')
      mockAplicationsService.createAplication.mockRejectedValue(mockError)

      await expect(resolver.createAplications(createInput)).rejects.toThrow(mockError)
      expect(service.createAplication).toHaveBeenCalledWith(createInput)
    })
  })

  describe('findAllAplications', () => {
    it('should return all applications', async () => {
      const expectedResult: AplicationsInput[] = [
        {
          id_aplications: 1,
          name: 'Application 1',
          description: 'Description 1',
          route: 'hola/test',
          // url: 'https://test.com',
          // icon: 'test-icon',
          // color: '#000000',
          created_usr: 1,
          created_at: new Date(),
        },
        {
          id_aplications: 2,
          name: 'Application 2',
          description: 'Description 2',
          url: 'https://app2.com',
          icon: 'icon2',
          color: '#222222',
        },
      ] as AplicationsInput[]

      mockAplicationsService.findAll.mockResolvedValue(expectedResult)

      const result = await resolver.findAllAplications()

      expect(service.findAll).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during findAll', async () => {
      const mockError = new Error('Service error')
      mockAplicationsService.findAll.mockRejectedValue(mockError)

      await expect(resolver.findAllAplications()).rejects.toThrow(mockError)
      expect(service.findAll).toHaveBeenCalled()
    })
  })

  describe('findOneAplications', () => {
    it('should return an application by id', async () => {
      const id = 1
      const expectedResult: AplicationsInput = {
        id_aplications: 1,
        name: 'Test Application',
        description: 'Test Description',
        route: 'hola/test',
        // url: 'https://test.com',
        // icon: 'test-icon',
        // color: '#000000',
        created_usr: 1,
        created_at: new Date(),
      } as AplicationsInput

      mockAplicationsService.findOne.mockResolvedValue(expectedResult)

      const result = await resolver.findOneAplications(id)

      expect(service.findOne).toHaveBeenCalledWith(id)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during findOne', async () => {
      const id = 1
      const mockError = new Error('Service error')
      mockAplicationsService.findOne.mockRejectedValue(mockError)

      await expect(resolver.findOneAplications(id)).rejects.toThrow(mockError)
      expect(service.findOne).toHaveBeenCalledWith(id)
    })
  })

  describe('updateAplications', () => {
    it('should update an application successfully', async () => {
      const updateInput: UpdateAplicationsInput = {
        id_aplications: 1,
        name: 'Updated Application',
        description: 'Updated Description',
      }

      const expectedResult: UpdateResultInput = {affected: 1} as UpdateResultInput

      mockAplicationsService.updateAplication.mockResolvedValue(expectedResult)

      const result = await resolver.updateAplications(updateInput)

      expect(service.updateAplication).toHaveBeenCalledWith(updateInput.id_aplications, updateInput)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during update', async () => {
      const updateInput: UpdateAplicationsInput = {
        id_aplications: 1,
        name: 'Updated Application',
      }

      const mockError = new Error('Service error')
      mockAplicationsService.updateAplication.mockRejectedValue(mockError)

      await expect(resolver.updateAplications(updateInput)).rejects.toThrow(mockError)
      expect(service.updateAplication).toHaveBeenCalledWith(updateInput.id_aplications, updateInput)
    })
  })

  describe('removeAplications', () => {
    it('should remove an application successfully', async () => {
      const id = 1
      const expectedResult: UpdateResultInput = {affected: 1} as UpdateResultInput

      mockAplicationsService.deleteById.mockResolvedValue(expectedResult)

      const result = await resolver.removeAplications(id)

      expect(service.deleteById).toHaveBeenCalledWith(id)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during removal', async () => {
      const id = 1
      const mockError = new Error('Service error')
      mockAplicationsService.deleteById.mockRejectedValue(mockError)

      await expect(resolver.removeAplications(id)).rejects.toThrow(mockError)
      expect(service.deleteById).toHaveBeenCalledWith(id)
    })
  })

  describe('GraphQL decorators', () => {
    it('should have correct GraphQL decorators', () => {
      const metadata = Reflect.getMetadata('graphql:resolver_type', AplicationsResolver)
      expect(metadata).toBeDefined()
    })

    it('should have correct mutation decorators', () => {
      const createMetadata = Reflect.getMetadata('graphql:mutation', resolver.createAplications)
      const updateMetadata = Reflect.getMetadata('graphql:mutation', resolver.updateAplications)
      const removeMetadata = Reflect.getMetadata('graphql:mutation', resolver.removeAplications)

      expect(createMetadata).toBeDefined()
      expect(updateMetadata).toBeDefined()
      expect(removeMetadata).toBeDefined()
    })

    it('should have correct query decorators', () => {
      const findAllMetadata = Reflect.getMetadata('graphql:query', resolver.findAllAplications)
      const findOneMetadata = Reflect.getMetadata('graphql:query', resolver.findOneAplications)

      expect(findAllMetadata).toBeDefined()
      expect(findOneMetadata).toBeDefined()
    })
  })
})
