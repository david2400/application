import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {User} from '../entities/user.entity'
import {CreateUserInput} from '../dto/create-user.input'
import {UserInput} from '../dto/user.input'
import {UpdateUserInput} from '../dto/update-user.input'
import {Repository} from 'typeorm'
import {GenericService} from '@/common/services'

@Injectable()
export class UsersService extends GenericService<User, UserInput> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super(User, UserInput)
  }

  protected getRepository(): Repository<User> {
    return this.userRepository
  }

  // async createUser(user: CreateUserInput) {
  //   const result =
  //     (await this.findOneByEmail(user.email)) || (await this.findOneByUsername(user.username))
  //   if (result != null) {
  //     throw new HttpException({message: 'User already registered'}, HttpStatus.NOT_FOUND)
  //   }
  //   const newUser = this.getRepository().create(user)

  //   const results = await this.getRepository().save(newUser)
  //   // const sendEmail = await this.sendEmail()

  //   return results
  // }

  // async findOneByUsername(username: string): Promise<UserInput> {
  //   const user = await this.getRepository().findOne({
  //     relations: {
  //       profile: true,
  //     },
  //     where: {username: username},
  //   })
  //   return user
  // }

  async findOneByEmail(email: string): Promise<any> {
    const user = await this.getRepository().findOne({
      where: {email: email},
    })

    return user
  }

  // async getRefreshTokenOfUserId(user_id: number) {
  //   const user = await this.getRepository().findOne({
  //     select: {id: true, username: true, refresh_token: true},
  //     where: {id: user_id},
  //   })

  //   return user
  // }

  async removeRefreshToken(user_id: number): Promise<any> {
    const result = await this.getRepository().update(
      {id: user_id},
      {
        refresh_token: null,
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

  async updateUser(id: number, user: UpdateUserInput) {
    const newUser = await this.getRepository().findOneById(id)
    if (!newUser) {
      throw new HttpException(
        {message: 'user does not exist or could not be modify!'},
        HttpStatus.NOT_FOUND
      )
    }

    this.getRepository().merge(newUser, user)

    const result = await this.getRepository().update(id, newUser)

    return result
  }

  async updateUserRefreshToken(user_id: number, refreshToken) {
    const hashRefreshToken = refreshToken

    const result = await this.userRepository.update(
      {id: user_id},
      {
        refresh_token: hashRefreshToken,
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
