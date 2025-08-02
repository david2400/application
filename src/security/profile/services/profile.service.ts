import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {ProfileInput} from '../dto/profile.input'
import {DeepPartial, Repository, UpdateResult} from 'typeorm'
import {UpdateProfileInput} from '../dto/update-profile.input'
import {CreateProfileInput} from '../dto/create-profile.input'
import {Profile} from '../entities/profile.entity'
import {InjectRepository} from '@nestjs/typeorm'
import {GenericService} from '@/common/services'
import {RoleService} from '../../role/services/role.service'
import {Mapper} from '@/common/mapper'

@Injectable()
export class ProfileService extends GenericService<Profile, ProfileInput> {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private roleService: RoleService
  ) {
    super(Profile, ProfileInput)
  }

  protected getRepository(): Repository<Profile> {
    return this.profileRepository
  }

  async createProfile(profile: CreateProfileInput): Promise<ProfileInput> {
    const results = await this.findOneByName(profile)
    if (results.length != 0) {
      throw new HttpException({message: 'The profile alread  y registered!'}, HttpStatus.FOUND)
    }
    const newProfile = this.getRepository().create(profile)

    const roles = await this.roleService.findByIds(profile.profile_role)
    if (roles.length == 0 || roles.length < profile.profile_role.length) {
      throw new HttpException({message: 'The roles are not exist!'}, HttpStatus.NOT_FOUND)
    }
    // newProfile.profile_role = roles

    const result = await this.getRepository().save(newProfile)

    return result
  }

  // async delete(id: number): Promise<UpdateResult> {
  //   const result = await this.getRepository().softDelete({id: id})
  //   if (result.affected === 0) {
  //     throw new HttpException(
  //       {message: 'The profile does not exist or could not be deleted!'},
  //       HttpStatus.NOT_FOUND
  //     )
  //   }

  //   return result
  // }

  // async restore(id: number) {
  //   const result = await this.getRepository().recover({id: id})

  //   if (result.delete_at === undefined) {
  //     throw new HttpException(
  //       {message: 'The profile does not exist or could not be restored!'},
  //       HttpStatus.NOT_FOUND
  //     )
  //   }

  //   return result
  // }

  async updateProfile(id: number, profile: UpdateProfileInput): Promise<ProfileInput> {
    const newProfile = await this.findOne(id)

    if (!newProfile) {
      throw new HttpException(
        {message: 'The profile does not exist or could not be modify!'},
        HttpStatus.NOT_FOUND
      )
    }

    if (profile.profile_role) {
      const roles = await this.roleService.findByIds(profile.profile_role)
      if (roles.length == 0 || roles.length < profile.profile_role.length) {
        throw new HttpException({message: 'The roles are not exist!'}, HttpStatus.NOT_FOUND)
      }
      newProfile.profile_role = roles
    }

    const newProfiles = Mapper.create().entityToDto(newProfile, Profile)

    this.getRepository().merge(newProfiles, profile)

    const result = await this.getRepository().save(newProfile)

    const newResult = Mapper.create().entityToDto(result, ProfileInput)

    return newResult
  }

  async findOneByName(profile: any): Promise<ProfileInput[]> {
    const roles = await this.getRepository().find({
      where: {name: profile.name},
    })
    return roles
  }

  // async findOne(id: number): Promise<ProfileInput> {
  //   const profile = await this.getRepository().findOne({
  //     where: {id: id},
  //   })
  //   return profile
  // }

  async findRoleUser(userid: number): Promise<ProfileInput[]> {
    const user = await this.getRepository().find({
      select: {name: true},
    })
    return user
  }

  // async findAll(): Promise<ProfileInput[]> {
  //   const result = await this.getRepository().find({withDeleted: true})
  //   return result
  // }
}
