import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import {CreateProfileInput} from '../dto/create-profile.input'
import {UpdateProfileInput} from '../dto/update-profile.input'
import {ProfileService} from '../services/profile.service'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'
import {ProfileInput} from '../dto/profile.input'
import {Profile} from '../entities/profile.entity'

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => ProfileInput)
  async createProfile(@Args('profile') createProfileInput: CreateProfileInput) {
    return await this.profileService.createProfile(createProfileInput)
  }

  @Query(() => [ProfileInput])
  async findAllProfile() {
    return await this.profileService.findAll()
  }

  @Query(() => ProfileInput)
  async findOneProfile(@Args('id') id: number) {
    return await this.profileService.findOne(id)
  }

  @Mutation(() => UpdateResultInput)
  async updateProfile(@Args('profile') updateProfileInput: UpdateProfileInput) {
    return await this.profileService.updateProfile(
      updateProfileInput.id_profile,
      updateProfileInput
    )
  }

  @Mutation(() => UpdateResultInput)
  async removeProfile(@Args('id') id: number) {
    return await this.profileService.deleteById(id)
  }
}
