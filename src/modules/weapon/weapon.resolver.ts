import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WeaponService } from './weapon.service';
import { Weapon } from './entities/weapon.entity';
import { CreateWeaponInput } from './dto/create-weapon.input';
import { UpdateWeaponInput } from './dto/update-weapon.input';
import { UserInputError } from 'apollo-server-express';

@Resolver(() => Weapon)
export class WeaponResolver {
  constructor(private readonly weaponService: WeaponService) {}

  /** Criar arma */
  @Mutation(() => Weapon)
  async createWeapon(@Args('data') data: CreateWeaponInput) {
    if (!data.name?.trim()) throw new UserInputError('Weapon name cannot be empty');
    return this.weaponService.create(data);
  }

  /** Buscar todas as armas */
  @Query(() => [Weapon], { name: 'weapons' })
  findAll() {
    return this.weaponService.findAll();
  }

  /** Buscar arma pelo ID */
  @Query(() => Weapon, { name: 'weapon' })
  async findOne(@Args('id') id: string) {
    if (!id.match(/^[a-f0-9-]+$/i)) throw new UserInputError('Invalid weapon ID format');
    return this.weaponService.findOne(id);
  }

  /** Atualizar arma */
  @Mutation(() => Weapon)
  async updateWeapon(@Args('id') id: string, @Args('data') data: UpdateWeaponInput) {
    if (!id.match(/^[a-f0-9-]+$/i)) throw new UserInputError('Invalid weapon ID format');
    return this.weaponService.update(id, data);
  }

  /** Remover arma */
  @Mutation(() => Weapon)
  async removeWeapon(@Args('id') id: string) {
    if (!id.match(/^[a-f0-9-]+$/i)) throw new UserInputError('Invalid weapon ID format');
    return this.weaponService.remove(id);
  }
}
