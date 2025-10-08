import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ArmorService } from './armor.service';
import { Armor } from './entities/armor.entity';
import { CreateArmorInput } from './dto/create-armor.input';
import { UpdateArmorInput } from './dto/update-armor.input';

@Resolver(() => Armor)
export class ArmorResolver {
  constructor(private readonly armorService: ArmorService) {}

  /** Criar armadura */
  @Mutation(() => Armor)
  createArmor(@Args('data') data: CreateArmorInput) {
    return this.armorService.create(data);
  }

  /** Buscar todas as armaduras */
  @Query(() => [Armor], { name: 'armors' })
  findAll() {
    return this.armorService.findAll();
  }

  /** Buscar uma armadura pelo ID */
  @Query(() => Armor, { name: 'armor' })
  findOne(@Args('id') id: string) {
    return this.armorService.findOne(id);
  }

  /** Atualizar armadura */
  @Mutation(() => Armor)
  updateArmor(@Args('data') data: UpdateArmorInput) {
    return this.armorService.update(data.id, data);
  }

  /** Remover armadura */
  @Mutation(() => Armor)
  removeArmor(@Args('id') id: string) {
    return this.armorService.remove(id);
  }
}
