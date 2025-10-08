import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserInputError } from 'apollo-server-express';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /** Criar usuário */
  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput) {
    if (!data.name?.trim()) {
      throw new UserInputError('User name cannot be empty');
    }
    return this.userService.create(data);
  }

  /** Buscar todos os usuários */
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  /** Buscar um usuário pelo ID */
  @Query(() => User, { name: 'user' })
  async findOne(@Args('id') id: string) {
    if (!id.match(/^[a-f0-9-]+$/i)) {
      throw new UserInputError('Invalid user ID format');
    }
    return this.userService.findOne(id);
  }

  /** Atualizar usuário */
  @Mutation(() => User)
  async updateUser(@Args('id') id: string, @Args('data') data: UpdateUserInput) {
    if (data.name && !data.name.trim()) {
      throw new UserInputError('User name cannot be empty');
    }
    return this.userService.update(id, data);
  }

  /** Remover usuário */
  @Mutation(() => User)
  async removeUser(@Args('id') id: string) {
    if (!id.match(/^[a-f0-9-]+$/i)) {
      throw new UserInputError('Invalid user ID format');
    }
    return this.userService.remove(id);
  }
}
