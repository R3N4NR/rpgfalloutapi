import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CharacterService } from './character.service';
import { Character } from './entities/character.entity';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';
import { EquipWeaponInput } from './dto/equip-weapon.input';
import { EquipArmorInput } from './dto/equip-armor.input';
import { ArmorSlot } from '@prisma/client';

@Resolver(() => Character)
export class CharacterResolver {
    constructor(private readonly characterService: CharacterService) { }

    @Mutation(() => Character)
    createCharacter(@Args('data') data: CreateCharacterInput) {
        return this.characterService.create(data);
    }

    @Mutation(() => Character)
    equipWeapon(@Args('characterId') characterId: string, @Args('weaponId') weaponId: string) {
        return this.characterService.equipWeapon(characterId, weaponId);
    }

    @Mutation(() => Character)
    unequipWeapon(@Args('characterId') characterId: string, @Args('weaponId') weaponId: string) {
        return this.characterService.unequipWeapon(characterId, weaponId);
    }

    @Mutation(() => Character)
    equipArmor(@Args('data') data: EquipArmorInput) {
        return this.characterService.equipArmor(data?.characterId, data.armorId, data.slot);
    }

    @Mutation(() => Character)
    unequipArmorSlot(@Args('characterId') characterId: string, @Args('slot') slot: ArmorSlot) {
        return this.characterService.unequipArmorSlot(characterId, slot);
    }

    @Mutation(() => Character)
    unequipAllArmor(@Args('characterId') characterId: string) {
        return this.characterService.unequipAllArmor(characterId);
    }
    @Query(() => [Character], { name: 'characters' })
    findAll() {
        return this.characterService.findAll();
    }

    @Query(() => Character, { name: 'character' })
    findOne(@Args('id') id: string) {
        return this.characterService.findOne(id);
    }

    @Mutation(() => Character)
    updateCharacter(@Args('id') id: string, @Args('data') data: UpdateCharacterInput) {
        return this.characterService.update(id, data);
    }

    @Mutation(() => Character)
    removeCharacter(@Args('id') id: string) {
        return this.characterService.remove(id);
    }
}
