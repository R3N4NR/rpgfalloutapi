import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PerkService } from './perk.service';
import { Perk } from './entities/perk.entity';
import { CreatePerkInput } from './dto/create-perk.input';
import { UpdatePerkInput } from './dto/update-perk.input';
import { UserInputError } from 'apollo-server-express';

@Resolver(() => Perk)
export class PerkResolver {
  constructor(private readonly perkService: PerkService) {}

  /** Criar perk */
  @Mutation(() => Perk)
  async createPerk(@Args('data') data: CreatePerkInput) {
    if (!data.name?.trim()) throw new UserInputError('Perk name cannot be empty');
    if (!data.description?.trim())
      throw new UserInputError('Perk description cannot be empty');

    return this.perkService.create(data);
  }

  /** Buscar todos os perks */
  @Query(() => [Perk], { name: 'perks' })
  findAll() {
    return this.perkService.findAll();
  }

  /** Buscar perk pelo ID */
  @Query(() => Perk, { name: 'perk' })
  async findOne(@Args('id') id: string) {
    if (!id.match(/^[a-f0-9-]+$/i)) throw new UserInputError('Invalid perk ID format');
    return this.perkService.findOne(id);
  }

  /** Atualizar perk */
  @Mutation(() => Perk)
  async updatePerk(@Args('id') id: string, @Args('data') data: UpdatePerkInput) {
    if (data.name && !data.name.trim()) throw new UserInputError('Perk name cannot be empty');
    if (data.description && !data.description.trim())
      throw new UserInputError('Perk description cannot be empty');

    return this.perkService.update(id, data);
  }

  /** Remover perk */
  @Mutation(() => Perk)
  async removePerk(@Args('id') id: string) {
    if (!id.match(/^[a-f0-9-]+$/i)) throw new UserInputError('Invalid perk ID format');
    return this.perkService.remove(id);
  }
}
