import {Test, TestingModule} from '@nestjs/testing'
import {ProfileResolver} from './profile.resolver'
import {ProfileService} from '../services/profile.service'
import {CreateProfileInput} from '../dto/create-profile.input'
import {UpdateProfileInput} from '../dto/update-profile.input'
import {ProfileInput} from '../dto/profile.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'

describe('ProfileResolver', () => {
  let resolver: ProfileResolver
  let service: ProfileService

  const mockProfileService = {
    createProfile: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateProfile: jest.fn(),
    deleteById: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileResolver,
        {
          provide: ProfileService,
          useValue: mockProfileService,
        },
      ],
    }).compile()

    resolver = module.get<ProfileResolver>(ProfileResolver)
    service = module.get<ProfileService>(ProfileService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createProfile', () => {
    it('should create a new profile successfully', async () => {
      const createInput: CreateProfileInput = {
        name: 'Test Profile',
        description: 'Test Description',
        created_usr: 1,
        created_at: new Date(),
      }

      const expectedResult: ProfileInput = {
        id_profile: 1,
        name: 'Test Profile',
        description: 'Test Description',
        created_usr: 1,
        created_at: new Date(),
      } as ProfileInput

      mockProfileService.createProfile.mockResolvedValue(expectedResult)

      const result = await resolver.createProfile(createInput)

      expect(service.createProfile).toHaveBeenCalledWith(createInput)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during creation', async () => {
      const createInput: CreateProfileInput = {
        name: 'Test Profile',
        description: 'Test Description',
        created_usr: 1,
        created_at: new Date(),
      }

      const mockError = new Error('Service error')
      mockProfileService.createProfile.mockRejectedValue(mockError)

      await expect(resolver.createProfile(createInput)).rejects.toThrow(mockError)
      expect(service.createProfile).toHaveBeenCalledWith(createInput)
    })
  })

  describe('findAllProfile', () => {
    it('should return all profiles', async () => {
      const expectedResult: ProfileInput[] = [
        {
          id_profile: 1,
          name: 'Profile 1',
          description: 'Description 1',
          created_usr: 1,
          created_at: new Date(),
        },
        {
          id_profile: 2,
          name: 'Profile 2',
          description: 'Description 2',
          created_usr: 1,
          created_at: new Date(),
        },
      ] as ProfileInput[]

      mockProfileService.findAll.mockResolvedValue(expectedResult)

      const result = await resolver.findAllProfile()

      expect(service.findAll).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during findAll', async () => {
      const mockError = new Error('Service error')
      mockProfileService.findAll.mockRejectedValue(mockError)

      await expect(resolver.findAllProfile()).rejects.toThrow(mockError)
      expect(service.findAll).toHaveBeenCalled()
    })
  })

  describe('findOneProfile', () => {
    it('should return a profile by id', async () => {
      const id = 1
      const expectedResult: ProfileInput = {
        id_profile: 1,
        name: 'Test Profile',
        description: 'Test Description',
        created_usr: 1,
        created_at: new Date(),
      } as ProfileInput

      mockProfileService.findOne.mockResolvedValue(expectedResult)

      const result = await resolver.findOneProfile(id)

      expect(service.findOne).toHaveBeenCalledWith(id)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during findOne', async () => {
      const id = 1
      const mockError = new Error('Service error')
      mockProfileService.findOne.mockRejectedValue(mockError)

      await expect(resolver.findOneProfile(id)).rejects.toThrow(mockError)
      expect(service.findOne).toHaveBeenCalledWith(id)
    })
  })

  describe('updateProfile', () => {
    it('should update a profile successfully', async () => {
      const updateInput: UpdateProfileInput = {
        id_profile: 1,
        name: 'Updated Profile',
        description: 'Updated Description',
      }

      const expectedResult: UpdateResultInput = {affected: 1} as UpdateResultInput

      mockProfileService.updateProfile.mockResolvedValue(expectedResult)

      const result = await resolver.updateProfile(updateInput)

      expect(service.updateProfile).toHaveBeenCalledWith(updateInput.id_profile, updateInput)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during update', async () => {
      const updateInput: UpdateProfileInput = {
        id_profile: 1,
        name: 'Updated Profile',
      }

      const mockError = new Error('Service error')
      mockProfileService.updateProfile.mockRejectedValue(mockError)

      await expect(resolver.updateProfile(updateInput)).rejects.toThrow(mockError)
      expect(service.updateProfile).toHaveBeenCalledWith(updateInput.id_profile, updateInput)
    })
  })

  describe('removeProfile', () => {
    it('should remove a profile successfully', async () => {
      const id = 1
      const expectedResult: UpdateResultInput = {affected: 1} as UpdateResultInput

      mockProfileService.deleteById.mockResolvedValue(expectedResult)

      const result = await resolver.removeProfile(id)

      expect(service.deleteById).toHaveBeenCalledWith(id)
      expect(result).toEqual(expectedResult)
    })

    it('should handle service errors during removal', async () => {
      const id = 1
      const mockError = new Error('Service error')
      mockProfileService.deleteById.mockRejectedValue(mockError)

      await expect(resolver.removeProfile(id)).rejects.toThrow(mockError)
      expect(service.deleteById).toHaveBeenCalledWith(id)
    })
  })

  describe('GraphQL decorators', () => {
    it('should have correct GraphQL decorators', () => {
      const metadata = Reflect.getMetadata('graphql:resolver_type', ProfileResolver)
      expect(metadata).toBeDefined()
    })

    it('should have correct mutation decorators', () => {
      const createMetadata = Reflect.getMetadata('graphql:mutation', resolver.createProfile)
      const updateMetadata = Reflect.getMetadata('graphql:mutation', resolver.updateProfile)
      const removeMetadata = Reflect.getMetadata('graphql:mutation', resolver.removeProfile)

      expect(createMetadata).toBeDefined()
      expect(updateMetadata).toBeDefined()
      expect(removeMetadata).toBeDefined()
    })

    it('should have correct query decorators', () => {
      const findAllMetadata = Reflect.getMetadata('graphql:query', resolver.findAllProfile)
      const findOneMetadata = Reflect.getMetadata('graphql:query', resolver.findOneProfile)

      expect(findAllMetadata).toBeDefined()
      expect(findOneMetadata).toBeDefined()
    })
  })
})
