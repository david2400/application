import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {DeepPartial, UpdateResult} from 'typeorm'
import {RoleService} from '@modules/security/role/services/role.service'
import {Profile} from '@modules/security/profile/entities/profile.entity'
import {CreateProfileDto} from '@modules/security/profile/dto/create-profile.dto'
import {UpdateProfileDto} from '@modules/security/profile/dto/update-profile.dto'
import {ProfileRepository} from '@modules/security/profile/repository/profile.repository'

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository, private roleService: RoleService) {}

  async createProfile(profile: CreateProfileDto): Promise<any> {
    const results = await this.findOneByName(profile)
    if (results.length != 0) {
      throw new HttpException({message: 'The profile alread  y registered!'}, HttpStatus.FOUND)
    }
    const newProfile = this.profileRepository.create(profile)

    const roles = await this.roleService.findByIds(profile.profile_role)
    if (roles.length == 0 || roles.length < profile.profile_role.length) {
      throw new HttpException({message: 'The roles are not exist!'}, HttpStatus.NOT_FOUND)
    }
    newProfile.profile_role = roles

    const result = await this.profileRepository.save(newProfile)

    return result
  }

  async delete(id: number): Promise<UpdateResult> {
    const result = await this.profileRepository.softDelete({id: id})
    if (result.affected === 0) {
      throw new HttpException(
        {message: 'The profile does not exist or could not be deleted!'},
        HttpStatus.NOT_FOUND
      )
    }

    return result
  }

  async restore(id: number) {
    const result = await this.profileRepository.recover({id: id})

    if (result.DeleteAt === undefined) {
      throw new HttpException(
        {message: 'The profile does not exist or could not be restored!'},
        HttpStatus.NOT_FOUND
      )
    }

    return result
  }

  async updateProfile(id: number, profile: UpdateProfileDto): Promise<any> {
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

    this.profileRepository.merge(newProfile, profile)

    const result = await this.profileRepository.save(newProfile)

    return result
  }

  async findOneByName(profile: any): Promise<any[]> {
    const roles = await this.profileRepository.find({
      where: {name: profile.name},
    })
    return roles
  }

  async findOne(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: {id: id},
    })
    return profile
  }

  async findRoleUser(userid: number): Promise<Profile[]> {
    const user = await this.profileRepository.find({
      select: {name: true},
    })
    return user
  }

  async findByIds(profile: DeepPartial<Profile[]>) {
    const result = await this.profileRepository.findByIds(profile)
    return result
  }

  async findAll(): Promise<UpdateProfileDto[]> {
    const result = await this.profileRepository.find({withDeleted: true})
    return result
  }
}
