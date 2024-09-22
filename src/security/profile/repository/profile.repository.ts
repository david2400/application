import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Profile} from '@modules/security/profile/entities/profile.entity'
import {BaseAbstractRepository} from '@common/class/base.abstract.repository'

@Injectable()
export class ProfileRepository extends BaseAbstractRepository<Profile> {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {
    super(profileRepository)
  }
}
