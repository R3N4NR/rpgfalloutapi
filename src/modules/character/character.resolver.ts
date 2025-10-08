import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CharacterService } from './character.service';
import { Character } from './entities/character.entity';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';
import { EquipArmorInput } from './dto/equip-armor.input';
import { UserInputError } from 'apollo-server-express';
import { ArmorSlot } from '../armor/enums/armorEnum';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) { }

  /** Criar personagem */
  @Mutation(() => Character)
  async createCharacter(@Args('data') data: CreateCharacterInput) {
    if (!data.name?.trim()) throw new UserInputError('Character name cannot be empty');
    return this.characterService.create(data);
  }

  /** Buscar todos os personagens */
  @Query(() => [Character], { name: 'characters' })
  findAll() {
    return this.characterService.findAll();
  }

  /** Buscar personagem pelo ID */
  @Query(() => Character, { name: 'character' })
  async findOne(@Args('id') id: string) {
    if (!id.match(/^[a-f0-9-]+$/i)) throw new UserInputError('Invalid character ID format');
    return this.characterService.findOne(id);
  }

  /** Atualizar personagem */
  @Mutation(() => Character)
  async updateCharacter(@Args('id') id: string, @Args('data') data: UpdateCharacterInput) {
    if (!id.match(/^[a-f0-9-]+$/i)) throw new UserInputError('Invalid character ID format');
    return this.characterService.update(id, data);
  }

  /** Remover personagem */
  @Mutation(() => Character)
  async removeCharacter(@Args('id') id: string) {
    if (!id.match(/^[a-f0-9-]+$/i)) throw new UserInputError('Invalid character ID format');
    return this.characterService.remove(id);
  }

  /** Equipar arma */
  @Mutation(() => Character)
  async equipWeapon(@Args('characterId') characterId: string, @Args('weaponId') weaponId: string) {
    if (!characterId?.trim() || !weaponId?.trim())
      throw new UserInputError('Character ID and Weapon ID are required');
    return this.characterService.equipWeapon(characterId, weaponId);
  }

  /** Desequipar arma */
  @Mutation(() => Character)
  async unequipWeapon(@Args('characterId') characterId: string, @Args('weaponId') weaponId: string) {
    if (!characterId?.trim() || !weaponId?.trim())
      throw new UserInputError('Character ID and Weapon ID are required');
    return this.characterService.unequipWeapon(characterId, weaponId);
  }

  /** Equipar armadura */
  @Mutation(() => Character)
  async equipArmor(@Args('data') data: EquipArmorInput) {
    if (!data.characterId?.trim() || !data.armorId?.trim())
      throw new UserInputError('Character ID and Armor ID are required');
    if (!Object.values(ArmorSlot).includes(data.slot as ArmorSlot))
      throw new UserInputError('Invalid armor slot');
    return this.characterService.equipArmor(data.characterId, data.armorId, data.slot);
  }

  /** Desequipar armadura por slot */
  @Mutation(() => Character)
  async unequipArmorSlot(@Args('characterId') characterId: string,
    @Args('unequipArmorSlot', { type: () => ArmorSlot }) unequipArmorSlot: ArmorSlot) {
    if (!characterId?.trim()) throw new UserInputError('Character ID is required');
    if (!Object.values(ArmorSlot).includes(unequipArmorSlot)) throw new UserInputError('Invalid armor slot');
    return this.characterService.unequipArmorSlot(characterId, unequipArmorSlot);
  }

  /** Desequipar todas as armaduras */
  @Mutation(() => Character)
  async unequipAllArmor(@Args('characterId') characterId: string) {
    if (!characterId?.trim()) throw new UserInputError('Character ID is required');
    return this.characterService.unequipAllArmor(characterId);
  }
}
