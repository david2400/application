import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UsersService } from './users.service'
import { User } from '../entities/user.entity'
import { CreateUserInput } from '../dto/create-user.input'
import { UpdateUserInput } from '../dto/update-user.input'
import { UserInput } from '../dto/user.input'
import { UpdateResultInput } from '@/common/domain/dto/update-result.input'
import { HttpException, HttpStatus } from '@nestjs/common'
import { Mapper } from '@/common/mapper'

describe('UsersService', () => {
  let service: UsersService
  let repository: Repository<User>

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOneById: jest.fn(),
    findOne: jest.fn(),
    merge: jest.fn(),
    update: jest.fn(),
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
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: 'DataSource',
          useValue: {
            getMetadata: jest.fn(() => ({
              columns: [
                { isPrimary: true, isGenerated: true, databaseName: 'id_user' },
              ],
            })),
          },
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    repository = module.get<Repository<User>>(getRepositoryToken(User))

    // Mock Mapper globally
    jest.spyOn(Mapper, 'create').mockReturnValue(mockMapper.create() as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findOneByEmail', () => {
    it('should find a user by email', async () => {
      const email = 'test@example.com'
      const mockUser = { id_user: 1, email, username: 'testuser' } as User

      mockRepository.findOne.mockResolvedValue(mockUser)

      const result = await service.findOneByEmail(email)

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email },
      })
      expect(result).toEqual(mockUser)
    })

    it('should return null when user is not found', async () => {
      const email = 'nonexistent@example.com'

      mockRepository.findOne.mockResolvedValue(null)

      const result = await service.findOneByEmail(email)

      expect(result).toBeNull()
    })

    it('should handle database errors', async () => {
      const email = 'test@example.com'
      const mockError = new Error('Database error')

      mockRepository.findOne.mockRejectedValue(mockError)

      await expect(service.findOneByEmail(email)).rejects.toThrow(mockError)
    })
  })

  describe('removeRefreshToken', () => {
    it('should remove refresh token successfully', async () => {
      const userId = 1
      const mockUpdateResult = { affected: 1 } as any

      mockRepository.update.mockResolvedValue(mockUpdateResult)

      const result = await service.removeRefreshToken(userId)

      expect(repository.update).toHaveBeenCalledWith(
        { id_user: userId },
        { refresh_token: null }
      )
      expect(result).toEqual(mockUpdateResult)
    })

    it('should throw HttpException when user does not exist', async () => {
      const userId = 1
      const mockUpdateResult = { affected: 0 } as any

      mockRepository.update.mockResolvedValue(mockUpdateResult)

      await expect(service.removeRefreshToken(userId)).rejects.toThrow(
        new HttpException(
          { message: 'user does not exist or could not be restored!' },
          HttpStatus.NOT_FOUND
        )
      )
    })

    it('should handle database errors', async () => {
      const userId = 1
      const mockError = new Error('Database error')

      mockRepository.update.mockRejectedValue(mockError)

      await expect(service.removeRefreshToken(userId)).rejects.toThrow(mockError)
    })
  })

  describe('updateUserRefreshToken', () => {
    it('should update refresh token successfully', async () => {
      const userId = 1
      const refreshToken = 'new-refresh-token'
      const mockUpdateResult = { affected: 1 } as any

      mockRepository.update.mockResolvedValue(mockUpdateResult)

      const result = await service.updateUserRefreshToken(userId, refreshToken)

      expect(repository.update).toHaveBeenCalledWith(
        { id_user: userId },
        { refresh_token: refreshToken }
      )
      expect(result).toEqual(mockUpdateResult)
    })

    it('should throw HttpException when user does not exist', async () => {
      const userId = 1
      const refreshToken = 'new-refresh-token'
      const mockUpdateResult = { affected: 0 } as any

      mockRepository.update.mockResolvedValue(mockUpdateResult)

      await expect(service.updateUserRefreshToken(userId, refreshToken)).rejects.toThrow(
        new HttpException(
          { message: 'user does not exist or could not be modify!' },
          HttpStatus.NOT_FOUND
        )
      )
    })

    it('should handle database errors', async () => {
      const userId = 1
      const refreshToken = 'new-refresh-token'
      const mockError = new Error('Database error')

      mockRepository.update.mockRejectedValue(mockError)

      await expect(service.updateUserRefreshToken(userId, refreshToken)).rejects.toThrow(mockError)
    })
  })

  // Tests for commented methods that might be uncommented later
  describe('createUser (commented method)', () => {
    it('should be implemented when uncommented', () => {
      // This test will be updated when the method is uncommented
      expect(true).toBe(true)
    })
  })

  describe('findOneByUsername (commented method)', () => {
    it('should be implemented when uncommented', () => {
      // This test will be updated when the method is uncommented
      expect(true).toBe(true)
    })
  })

  describe('getRefreshTokenOfUserId (commented method)', () => {
    it('should be implemented when uncommented', () => {
      // This test will be updated when the method is uncommented
      expect(true).toBe(true)
    })
  })

  describe('updateUser (commented method)', () => {
    it('should be implemented when uncommented', () => {
      // This test will be updated when the method is uncommented
      expect(true).toBe(true)
    })
  })

  describe('sendEmail (commented method)', () => {
    it('should be implemented when uncommented', () => {
      // This test will be updated when the method is uncommented
      expect(true).toBe(true)
    })
  })

  // Tests for inherited GenericService methods
  describe('findOne', () => {
    it('should find a user by id', async () => {
      const id = 1
      const mockUser = { id_user: 1, username: 'testuser' } as User
      const mockUserInput = { id_user: 1, username: 'testuser' } as UserInput

      mockRepository.findOne.mockResolvedValue(mockUser)
      mockMapper.create().entityToDto.mockReturnValue(mockUserInput)

      const result = await service.findOne(id)

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id_user: id },
      })
      expect(result).toEqual(mockUserInput)
    })
  })

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { id_user: 1, username: 'user1' },
        { id_user: 2, username: 'user2' },
      ] as User[]

      const mockUserInputs = [
        { id_user: 1, username: 'user1' },
        { id_user: 2, username: 'user2' },
      ] as UserInput[]

      mockRepository.find.mockResolvedValue(mockUsers)
      mockMapper.create().convertToListDto.mockReturnValue(mockUserInputs)

      const result = await service.findAll()

      expect(repository.find).toHaveBeenCalledWith({ withDeleted: true })
      expect(result).toEqual(mockUserInputs)
    })
  })

  describe('deleteById', () => {
    it('should delete a user by id', async () => {
      const id = 1
      const mockDeleteResult = { affected: 1 } as any

      mockRepository.softDelete.mockResolvedValue(mockDeleteResult)

      const result = await service.deleteById(id)

      expect(repository.softDelete).toHaveBeenCalledWith({ id_user: id })
      expect(result).toEqual(mockDeleteResult)
    })

    it('should throw HttpException when user does not exist for deletion', async () => {
      const id = 1
      const mockDeleteResult = { affected: 0 } as any

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
    it('should restore a deleted user', async () => {
      const id = 1
      const mockUser = { id_user: 1, username: 'testuser' } as User
      const mockUserInput = { id_user: 1, username: 'testuser' } as UserInput

      mockRepository.recover.mockResolvedValue(mockUser)
      mockMapper.create().entityToDto.mockReturnValue(mockUserInput)

      const result = await service.restoreById(id)

      expect(repository.recover).toHaveBeenCalledWith({ id_user: id })
      expect(result).toEqual(mockUserInput)
    })

    it('should throw HttpException when user does not exist for restoration', async () => {
      const id = 1

      mockRepository.recover.mockResolvedValue(null)

      await expect(service.restoreById(id)).rejects.toThrow(
        new HttpException(
          { message: 'Register does not exist or could not be restored!' },
          HttpStatus.NOT_FOUND
        )
      )
    })
  })

  describe('getPrimaryGeneratedColumnName', () => {
    it('should return the correct primary column name', () => {
      const result = service.getPrimaryGeneratedColumnName()

      expect(result).toBe('id_user')
    })
  })
})
