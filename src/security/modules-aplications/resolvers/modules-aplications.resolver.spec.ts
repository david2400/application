import {Test, TestingModule} from '@nestjs/testing'
import {ModulesAplicationsResolver} from './modules-aplications.resolver'
import {ModulesAplicationsService} from '../services/modules-aplications.service'
import {CreateModulesAplicationInput} from '../dto/create-modules-aplication.input'
import {UpdateModulesAplicationInput} from '../dto/update-modules-aplication.input'
import {ModulesAplicationInput} from '../dto/modules-aplication.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'

describe('ModulesAplicationsResolver', () => {
  let resolver: ModulesAplicationsResolver
  let service: ModulesAplicationsService

  const mockModulesAplicationsService = {
    createModulesAplication: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateModulesAplication: jest.fn(),
    deleteById: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModulesAplicationsResolver,
        {
          provide: ModulesAplicationsService,
          useValue: mockModulesAplicationsService,
        },
      ],
    }).compile()

    resolver = module.get<ModulesAplicationsResolver>(ModulesAplicationsResolver)
    service = module.get<ModulesAplicationsService>(ModulesAplicationsService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createModulesAplication', () => {
    it('should create a new module application successfully', async () => {
      const createInput: CreateModulesAplicationInput = {
        name: 'Test Module',
        description: 'Test Description',
        aplication_id: 1,
        // icon: 'test-icon',
        // color: '#000000',
        // url: '/test-module',
        created_usr: 1,
      }

      const expectedResult: ModulesAplicationInput = {
        id_modules_aplication: 1,
        name: 'Test Module',
        description: 'Test Description',
        aplication_id: 1,
        // icon: 'test-icon',
        // color: '#000000',
        // url: '/test-module',
      } as ModulesAplicationInput

      mockModulesAplicationsService.createModulesAplication.mockResolvedValue(expectedResult)

      const result = await resolver.createModulesAplication(createInput)

      expect(service.createModulesAplication).toHaveBeenCalledWith(createInput)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during creation', async () => {
      const createInput: CreateModulesAplicationInput = {
        name: 'Test Module',
        description: 'Test Description',
        aplication_id: 1,
        // icon: 'test-icon',
        // color: '#000000',
        // url: '/test-module',
        created_usr: 1,
        created_at: new Date(),
      }

      const mockError = new Error('Service error')
      mockModulesAplicationsService.createModulesAplication.mockRejectedValue(mockError)

      await expect(resolver.createModulesAplication(createInput)).rejects.toThrow(mockError)
      expect(service.createModulesAplication).toHaveBeenCalledWith(createInput)
    })
  })

  describe('findAllModulesAplications', () => {
    it('should return all module applications', async () => {
      const expectedResult: ModulesAplicationInput[] = [
        {
          id_modules_aplication: 1,
          name: 'Module 1',
          description: 'Description 1',
          aplication_id: 1,
          // icon: 'icon1',
          // color: '#111111',
          // url: '/module1',
        },
        {
          id_modules_aplication: 2,
          name: 'Module 2',
          description: 'Description 2',
          aplication_id: 1,
          // icon: 'icon2',
          // color: '#222222',
          // url: '/module2',
        },
      ] as ModulesAplicationInput[]

      mockModulesAplicationsService.findAll.mockResolvedValue(expectedResult)

      const result = await resolver.findAllModulesAplications()

      expect(service.findAll).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during findAll', async () => {
      const mockError = new Error('Service error')
      mockModulesAplicationsService.findAll.mockRejectedValue(mockError)

      await expect(resolver.findAllModulesAplications()).rejects.toThrow(mockError)
      expect(service.findAll).toHaveBeenCalled()
    })
  })

  describe('findOneModuleAplication', () => {
    it('should return a module application by id', async () => {
      const id = 1
      const expectedResult: ModulesAplicationInput = {
        id_modules_aplication: 1,
        name: 'Test Module',
        description: 'Test Description',
        aplication_id: 1,
        // icon: 'test-icon',
        // color: '#000000',
        // url: '/test-module',
      } as ModulesAplicationInput

      mockModulesAplicationsService.findOne.mockResolvedValue(expectedResult)

      const result = await resolver.findOneModuleAplication(id)

      expect(service.findOne).toHaveBeenCalledWith(id)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during findOne', async () => {
      const id = 1
      const mockError = new Error('Service error')
      mockModulesAplicationsService.findOne.mockRejectedValue(mockError)

      await expect(resolver.findOneModuleAplication(id)).rejects.toThrow(mockError)
      expect(service.findOne).toHaveBeenCalledWith(id)
    })
  })

  describe('updateModuleAplication', () => {
    it('should update a module application successfully', async () => {
      const updateInput: UpdateModulesAplicationInput = {
        id_modules_aplication: 1,
        name: 'Updated Module',
        description: 'Updated Description',
      }

      const expectedResult: UpdateResultInput = {affected: 1} as UpdateResultInput

      mockModulesAplicationsService.updateModulesAplication.mockResolvedValue(expectedResult)

      const result = await resolver.updateModuleAplication(updateInput)

      expect(service.updateModulesAplication).toHaveBeenCalledWith(
        updateInput.id_modules_aplication,
        updateInput
      )
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during update', async () => {
      const updateInput: UpdateModulesAplicationInput = {
        id_modules_aplication: 1,
        name: 'Updated Module',
      }

      const mockError = new Error('Service error')
      mockModulesAplicationsService.updateModulesAplication.mockRejectedValue(mockError)

      await expect(resolver.updateModuleAplication(updateInput)).rejects.toThrow(mockError)
      expect(service.updateModulesAplication).toHaveBeenCalledWith(
        updateInput.id_modules_aplication,
        updateInput
      )
    })
  })

  describe('removeModuleAplication', () => {
    it('should remove a module application successfully', async () => {
      const id = 1
      const expectedResult: UpdateResultInput = {affected: 1} as UpdateResultInput

      mockModulesAplicationsService.deleteById.mockResolvedValue(expectedResult)

      const result = await resolver.removeModuleAplication(id)

      expect(service.deleteById).toHaveBeenCalledWith(id)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during removal', async () => {
      const id = 1
      const mockError = new Error('Service error')
      mockModulesAplicationsService.deleteById.mockRejectedValue(mockError)

      await expect(resolver.removeModuleAplication(id)).rejects.toThrow(mockError)
      expect(service.deleteById).toHaveBeenCalledWith(id)
    })
  })

  describe('GraphQL decorators', () => {
    it('should have correct GraphQL decorators', () => {
      const metadata = Reflect.getMetadata('graphql:resolver_type', ModulesAplicationsResolver)
      expect(metadata).toBeDefined()
    })

    it('should have correct mutation decorators', () => {
      const createMetadata = Reflect.getMetadata(
        'graphql:mutation',
        resolver.createModulesAplication
      )
      const updateMetadata = Reflect.getMetadata(
        'graphql:mutation',
        resolver.updateModuleAplication
      )
      const removeMetadata = Reflect.getMetadata(
        'graphql:mutation',
        resolver.removeModuleAplication
      )

      expect(createMetadata).toBeDefined()
      expect(updateMetadata).toBeDefined()
      expect(removeMetadata).toBeDefined()
    })

    it('should have correct query decorators', () => {
      const findAllMetadata = Reflect.getMetadata(
        'graphql:query',
        resolver.findAllModulesAplications
      )
      const findOneMetadata = Reflect.getMetadata('graphql:query', resolver.findOneModuleAplication)

      expect(findAllMetadata).toBeDefined()
      expect(findOneMetadata).toBeDefined()
    })
  })
})
