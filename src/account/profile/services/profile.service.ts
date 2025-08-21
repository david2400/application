import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common'
import {ProfileInput} from '../dto/profile.input'
import {Repository, UpdateResult} from 'typeorm'
import {UpdateProfileInput} from '../dto/update-profile.input'
import {CreateProfileInput} from '../dto/create-profile.input'
import {Profile} from '../entities/profile.entity'
import {InjectRepository} from '@nestjs/typeorm'
import {GenericService} from '@/common/services'
import {RoleService} from '../../../security/role/services/role.service'
import {Mapper} from '@/common/mapper'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'

@Injectable()
export class ProfileService extends GenericService<Profile, ProfileInput> {
  private readonly logger = new Logger(ProfileService.name)

  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
    // private roleService: RoleService
  ) {
    super(Profile, ProfileInput)
  }

  protected getRepository(): Repository<Profile> {
    return this.profileRepository
  }

  async createProfile(profile: CreateProfileInput): Promise<ProfileInput> {
    try {
      // const results = await this.findOneByName(profile)
      // if (results.length != 0) {
      //   throw new HttpException({message: 'The profile alread  y registered!'}, HttpStatus.FOUND)
      // }
      // const roles = await this.roleService.findByIds(profile.profile_role)
      // profile.profile_role = roles
      const profiles: Profile = this.getRepository().create(profile)

      // const roles = await this.roleService.findByIds(profile.profile_role)
      // if (roles.length == 0 || roles.length < profile.profile_role.length) {
      //   throw new HttpException({message: 'The roles are not exist!'}, HttpStatus.NOT_FOUND)
      // }
      // newProfile.profile_role = roles

      const results: Profile = await this.getRepository().save(profiles)
      const profileInput: ProfileInput = Mapper.create().entityToDto(results, ProfileInput)

      return profileInput
    } catch (error) {
      return error
    }
  }

  async updateProfile(id: number, profile: UpdateProfileInput): Promise<UpdateResultInput> {
    try {
      const newProfile: Profile = await this.getRepository().findOneById(id)
      if (!newProfile) {
        throw new HttpException(
          {message: 'The profile does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      }

      this.getRepository().merge(newProfile, profile)

      // if (profile.profile_role) {
      //   const roles = await this.roleService.findByIds(profile.profile_role)
      //   if (roles.length == 0 || roles.length < profile.profile_role.length) {
      //     throw new HttpException({message: 'The roles are not exist!'}, HttpStatus.NOT_FOUND)
      //   }
      //   newProfile.profile_role = roles
      // }

      // const newProfiles = Mapper.create().entityToDto(newProfile, Profile)

      // this.getRepository().merge(newProfiles, profile)

      const result: UpdateResult = await this.getRepository().update(id, newProfile)

      if (result.affected === 0) {
        throw new HttpException(
          {message: 'The Aplication does not exist or could not be modify!'},
          HttpStatus.NOT_FOUND
        )
      }

      return result
    } catch (error) {
      this.logger.error(`Error updating profile with ID: ${id}`, error)
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Internal server error during profile update',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
