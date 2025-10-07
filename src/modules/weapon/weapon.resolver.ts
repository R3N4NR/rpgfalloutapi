import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WeaponService } from './weapon.service';
import { Weapon } from './entities/weapon.entity';
import { CreateWeaponInput } from './dto/create-weapon.input';
import { UpdateWeaponInput } from './dto/update-weapon.input';

@Resolver(() => Weapon)
export class WeaponResolver {
    constructor(private readonly weaponService: WeaponService) { }

    @Mutation(() => Weapon)
    createWeapon(@Args('data') data: CreateWeaponInput) {
        return this.weaponService.create(data);
    }

    @Query(() => [Weapon], { name: 'weapons' })
    findAll() {
        return this.weaponService.findAll();
    }

    @Query(() => Weapon, { name: 'weapon' })
    findOne(@Args('id', { type: () => Int }) id: string) {
        return this.weaponService.findOne(id);
    }

    @Mutation(() => Weapon)
    updateWeapon(@Args('data') data: UpdateWeaponInput) {
        return this.weaponService.update(data.id, data);
    }

    @Mutation(() => Weapon)
    removeWeapon(@Args('id', { type: () => Int }) id: string) {
        return this.weaponService.remove(id);
    }
}
