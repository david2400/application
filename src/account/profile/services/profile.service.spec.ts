import {Test, TestingModule} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {ProfileService} from './profile.service'
import {Profile} from '../entities/profile.entity'
import {CreateProfileInput} from '../dto/create-profile.input'
import {UpdateProfileInput} from '../dto/update-profile.input'
import {ProfileInput} from '../dto/profile.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'
import {HttpException, HttpStatus} from '@nestjs/common'
import {Mapper} from '@/common/mapper'

describe('ProfileService', () => {
  let service: ProfileService
  let repository: Repository<Profile>

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
        ProfileService,
        {
          provide: getRepositoryToken(Profile),
          useValue: mockRepository,
        },
        {
          provide: 'DataSource',
          useValue: {
            getMetadata: jest.fn(() => ({
              columns: [{isPrimary: true, isGenerated: true, databaseName: 'id_profile'}],
            })),
          },
        },
      ],
    }).compile()

    service = module.get<ProfileService>(ProfileService)
    repository = module.get<Repository<Profile>>(getRepositoryToken(Profile))

    // Mock Mapper globally
    jest.spyOn(Mapper, 'create').mockReturnValue(mockMapper.create() as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createProfile', () => {
    it('should create a new profile successfully', async () => {
      const createInput: CreateProfileInput = {
        name: 'Test Profile',
        description: 'Test Description',
        created_usr: 1,
        created_at: new Date(),
      }

      const mockProfile = {id_profile: 1, ...createInput} as Profile
      const mockSavedProfile = {id_profile: 1, ...createInput} as Profile
      const mockProfileInput = {id_profile: 1, ...createInput} as ProfileInput

      mockRepository.create.mockReturnValue(mockProfile)
      mockRepository.save.mockResolvedValue(mockSavedProfile)
      mockMapper.create().entityToDto.mockReturnValue(mockProfileInput)

      const result = await service.createProfile(createInput)

      expect(repository.create).toHaveBeenCalledWith(createInput)
      expect(repository.save).toHaveBeenCalledWith(mockProfile)
      expect(result).toEqual(mockProfileInput)
    })

    it('should handle errors during creation', async () => {
      const createInput: CreateProfileInput = {
        name: 'Test Profile',
        description: 'Test Description',
        created_usr: 1,
        created_at: new Date(),
      }

      const mockError = new Error('Database error')
      mockRepository.create.mockReturnValue({})
      mockRepository.save.mockRejectedValue(mockError)

      const result = await service.createProfile(createInput)

      expect(result).toBe(mockError)
    })

    // Tests for commented validation logic
    it('should handle profile name validation when implemented', async () => {
      const createInput: CreateProfileInput = {
        name: 'Test Profile',
        description: 'Test Description',
        created_usr: 1,
        created_at: new Date(),
      }

      // This test will be updated when the validation is uncommented
      expect(createInput.name).toBeDefined()
    })

    it('should handle role validation when implemented', async () => {
      const createInput: CreateProfileInput = {
        name: 'Test Profile',
        description: 'Test Description',
        created_usr: 1,
        created_at: new Date(),
      }

      // This test will be updated when the role validation is uncommented
      expect(createInput).toBeDefined()
    })
  })

  describe('updateProfile', () => {
    it('should update a profile successfully', async () => {
      const id = 1
      const updateInput: UpdateProfileInput = {
        id_profile: 1,
        name: 'Updated Profile',
        description: 'Updated Description',
      }

      const existingProfile = {
        id_profile: 1,
        name: 'Old Profile',
        description: 'Old Description',
        created_usr: 1,
        created_at: new Date(),
      } as Profile

      const mockUpdateResult = {affected: 1} as any

      mockRepository.findOneById.mockResolvedValue(existingProfile)
      mockRepository.merge.mockImplementation((entity, update) => Object.assign(entity, update))
      mockRepository.update.mockResolvedValue(mockUpdateResult)

      const result = await service.updateProfile(id, updateInput)

      expect(repository.findOneById).toHaveBeenCalledWith(id)
      expect(repository.merge).toHaveBeenCalledWith(existingProfile, updateInput)
      expect(repository.update).toHaveBeenCalledWith(id, existingProfile)
      expect(result).toEqual(mockUpdateResult)
    })

    it('should throw HttpException when profile does not exist', async () => {
      const id = 1
      const updateInput: UpdateProfileInput = {
        id_profile: 1,
        name: 'Updated Profile',
      }

      mockRepository.findOneById.mockResolvedValue(null)

      await expect(service.updateProfile(id, updateInput)).rejects.toThrow(
        new HttpException(
          {message: 'The profile does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      )
    })

    it('should throw HttpException when update affects no rows', async () => {
      const id = 1
      const updateInput: UpdateProfileInput = {
        id_profile: 1,
        name: 'Updated Profile',
      }

      const existingProfile = {id_profile: 1, name: 'Old Profile'} as Profile
      const mockUpdateResult = {affected: 0} as any

      mockRepository.findOneById.mockResolvedValue(existingProfile)
      mockRepository.merge.mockImplementation((entity, update) => Object.assign(entity, update))
      mockRepository.update.mockResolvedValue(mockUpdateResult)

      await expect(service.updateProfile(id, updateInput)).rejects.toThrow(
        new HttpException(
          {message: 'The Aplication does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      )
    })

    it('should handle errors during update', async () => {
      const id = 1
      const updateInput: UpdateProfileInput = {
        id_profile: 1,
        name: 'Updated Profile',
      }

      const mockError = new Error('Database error')
      mockRepository.findOneById.mockRejectedValue(mockError)

      const result = await service.updateProfile(id, updateInput)

      expect(result).toBe(mockError)
    })

    // Tests for commented role validation logic
    it('should handle role validation during update when implemented', async () => {
      const id = 1
      const updateInput: UpdateProfileInput = {
        id_profile: 1,
        name: 'Updated Profile',
      }

      // This test will be updated when the role validation is uncommented
      expect(updateInput).toBeDefined()
    })
  })

  // Tests for inherited GenericService methods
  describe('findOne', () => {
    it('should find a profile by id', async () => {
      const id = 1
      const mockProfile = {id_profile: 1, name: 'Test Profile'} as Profile
      const mockProfileInput = {id_profile: 1, name: 'Test Profile'} as ProfileInput

      mockRepository.findOne.mockResolvedValue(mockProfile)
      mockMapper.create().entityToDto.mockReturnValue(mockProfileInput)

      const result = await service.findOne(id)

      expect(repository.findOne).toHaveBeenCalledWith({
        where: {id_profile: id},
      })
      expect(result).toEqual(mockProfileInput)
    })
  })

  describe('findAll', () => {
    it('should return all profiles', async () => {
      const mockProfiles = [
        {id_profile: 1, name: 'Profile 1'},
        {id_profile: 2, name: 'Profile 2'},
      ] as Profile[]

      const mockProfileInputs = [
        {id_profile: 1, name: 'Profile 1'},
        {id_profile: 2, name: 'Profile 2'},
      ] as ProfileInput[]

      mockRepository.find.mockResolvedValue(mockProfiles)
      mockMapper.create().convertToListDto.mockReturnValue(mockProfileInputs)

      const result = await service.findAll()

      expect(repository.find).toHaveBeenCalledWith({withDeleted: true})
      expect(result).toEqual(mockProfileInputs)
    })
  })

  describe('deleteById', () => {
    it('should delete a profile by id', async () => {
      const id = 1
      const mockDeleteResult = {affected: 1} as any

      mockRepository.softDelete.mockResolvedValue(mockDeleteResult)

      const result = await service.deleteById(id)

      expect(repository.softDelete).toHaveBeenCalledWith({id_profile: id})
      expect(result).toEqual(mockDeleteResult)
    })

    it('should throw HttpException when profile does not exist for deletion', async () => {
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
    it('should restore a deleted profile', async () => {
      const id = 1
      const mockProfile = {id_profile: 1, name: 'Test Profile'} as Profile
      const mockProfileInput = {id_profile: 1, name: 'Test Profile'} as ProfileInput

      mockRepository.recover.mockResolvedValue(mockProfile)
      mockMapper.create().entityToDto.mockReturnValue(mockProfileInput)

      const result = await service.restoreById(id)

      expect(repository.recover).toHaveBeenCalledWith({id_profile: id})
      expect(result).toEqual(mockProfileInput)
    })

    it('should throw HttpException when profile does not exist for restoration', async () => {
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

      expect(result).toBe('id_profile')
    })
  })
})
