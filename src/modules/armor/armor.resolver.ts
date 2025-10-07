import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ArmorService } from './armor.service';
import { Armor } from './entities/armor.entity';
import { CreateArmorInput } from './dto/create-armor.input';
import { UpdateArmorInput } from './dto/update-armor.input';

@Resolver(() => Armor)
export class ArmorResolver {
    constructor(private readonly armorService: ArmorService) { }

    @Mutation(() => Armor)
    createArmor(@Args('data') data: CreateArmorInput) {
        return this.armorService.create(data);
    }

    @Query(() => [Armor], { name: 'armors' })
    findAll() {
        return this.armorService.findAll();
    }

    @Query(() => Armor, { name: 'armor' })
    findOne(@Args('id', { type: () => Int }) id: string) {
        return this.armorService.findOne(id);
    }

    @Mutation(() => Armor)
    updateArmor(@Args('data') data: UpdateArmorInput) {
        return this.armorService.update(data.id, data);
    }

    @Mutation(() => Armor)
    removeArmor(@Args('id', { type: () => Int }) id: string) {
        return this.armorService.remove(id);
    }
}
