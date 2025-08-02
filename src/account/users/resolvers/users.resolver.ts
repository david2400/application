import {Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import {CreateUserInput} from '../dto/create-user.input'
import {UpdateUserInput} from '../dto/update-user.input'
import {UsersService} from '../services/users.service'
import {UserInput} from '../dto/user.input'
import {UpdateResultInput} from '@/common/domain/dto/update-result.input'

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Mutation(() => user)
  // create(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.create(createUserInput)
  // }

  @Query(() => UserInput)
  async findAllUsers(): Promise<UserInput[]> {
    return this.usersService.findAll()
  }

  @Query(() => UserInput)
  async findOneUser(@Args('id') id: number): Promise<UserInput> {
    return this.usersService.findOne(id)
  }

  @Mutation(() => UpdateResultInput)
  async updateUser(@Args('user') user: UpdateUserInput): Promise<UpdateResultInput> {
    return this.usersService.updateUser(user.id, user)
  }

  @Mutation(() => UpdateResultInput)
  async removeUser(@Args('id') id: number) {
    return this.usersService.deleteById(id)
  }
}
