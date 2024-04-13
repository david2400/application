import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
// import {MailerService} from '@nestjs-modules/mailer'
import {ProfileService} from '@modules/security/profile/services/profile.service'
import {CreateUserDto} from '@modules/account/user/dto/create-user.dto'
import {UpdateUserDto} from '@modules/account/user/dto/update-user.dto'
import {UserRepository} from '@modules/account/user/repository/user.repository'
import {User} from '../entities/user.entity'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private profileService: ProfileService) {}

  async createUser(user: CreateUserDto) {
    const result =
      (await this.findOneByEmail(user.Email)) || (await this.findOneByUsername(user.Username))
    if (result != null) {
      throw new HttpException({message: 'User already registered'}, HttpStatus.NOT_FOUND)
    }
    const newUser = this.userRepository.create(user)

    const profile = await this.profileService.findOne(user.ProfileId)
    if (!profile) {
      throw new HttpException({message: 'The profile does not exist!'}, HttpStatus.NOT_FOUND)
    }
    newUser.Profile = profile

    const results = await this.userRepository.save(newUser)
    // const sendEmail = await this.sendEmail()

    return results
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.softDelete({Id: id})
    if (result.affected === 0) {
      throw new HttpException(
        {message: 'User does not exist or could not be deleted!'},
        HttpStatus.NOT_FOUND
      )
    }
    return result
  }

  async findOneByUsername(username: string): Promise<UpdateUserDto> {
    const user = await this.userRepository.findOne({
      relations: {
        Profile: true,
      },
      where: {Username: username},
    })
    return user
  }

  async findOneByEmail(email: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {Email: email},
    })

    return user
  }

  async findOne(id: number): Promise<User> {
    const role = await this.userRepository.findOne({
      where: {Id: id},
    })
    return role
  }

  async findAll(): Promise<UpdateUserDto[]> {
    const result = await this.userRepository.find({withDeleted: true})
    return result
  }

  async getRefreshTokenOfUserId(user_id: number) {
    const user = await this.userRepository.findOne({
      select: {Id: true, Username: true, RefreshToken: true},
      where: {Id: user_id},
    })

    return user
  }

  async restore(id: number) {
    const result = await this.userRepository.recover({Id: id})
    if (result.DeleteAt === undefined) {
      throw new HttpException(
        {message: 'user does not exist or could not be restored!'},
        HttpStatus.NOT_FOUND
      )
    }
    return result
  }

  async removeRefreshToken(user_id: number): Promise<any> {
    const result = await this.userRepository.update(
      {Id: user_id},
      {
        RefreshToken: null,
      }
    )
    if (result.affected === 0) {
      throw new HttpException(
        {message: 'user does not exist or could not be restored!'},
        HttpStatus.NOT_FOUND
      )
    }
    return result
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const newUser = await this.findOne(id)
    if (!newUser) {
      throw new HttpException(
        {message: 'user does not exist or could not be modify!'},
        HttpStatus.NOT_FOUND
      )
    }

    if (newUser.Profile.Id != user.ProfileId) {
      const profile = await this.profileService.findOne(user.ProfileId)
      if (!profile) {
        throw new HttpException({message: 'The profile does not exist!'}, HttpStatus.NOT_FOUND)
      }
      newUser.Profile = profile
    }

    this.userRepository.merge(newUser, user)

    const result = await this.userRepository.save(newUser)

    return result
  }

  async updateUserRefreshToken(user_id: number, refreshToken) {
    const hashRefreshToken = refreshToken

    const result = await this.userRepository.update(
      {Id: user_id},
      {
        RefreshToken: hashRefreshToken,
      }
    )
    if (result.affected === 0) {
      throw new HttpException(
        {message: 'user does not exist or could not be modify!'},
        HttpStatus.NOT_FOUND
      )
    }
    return result
  }

  // async sendEmail() {
  //   return this.mailerService
  //     .sendMail({
  //       to: 'davi42@hotmail.es',
  //       from: 'davi42@hotmail.es',
  //       subject: 'Testing Nest MailerModule ✔',
  //       template: 'index',
  //       context: {
  //         code: 'cf1a3f828287',
  //         username: 'john doe',
  //       },
  //     })
  //     .then((data) => {
  //       console.log(data)
  //       return data
  //     })
  //     .catch((error) => {
  //       throw new NotFoundException('')
  //     })
  // }
}
