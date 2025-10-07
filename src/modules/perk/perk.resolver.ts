import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PerkService } from './perk.service';
import { Perk } from './entities/perk.entity';
import { CreatePerkInput } from './dto/create-perk.input';
import { UpdatePerkInput } from './dto/update-perk.input';

@Resolver(() => Perk)
export class PerkResolver {
    constructor(private readonly perkService: PerkService) { }


    @Mutation(() => Perk)
    createPerk(@Args('data') data: CreatePerkInput) {
        return this.perkService.create(data);
    }


    @Query(() => [Perk], { name: 'perks' })
    findAll() {
        return this.perkService.findAll();
    }


    @Query(() => Perk, { name: 'perk' })
    findOne(@Args('id') id: string) {
        return this.perkService.findOne(id);
    }


    @Mutation(() => Perk)
    updatePerk(@Args('id') id: string, @Args('data') data: UpdatePerkInput) {
        return this.perkService.update(id, data);
    }


    @Mutation(() => Perk)
    removePerk(@Args('id') id: string) {
        return this.perkService.remove(id);
    }
}
