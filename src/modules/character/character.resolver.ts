import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CharacterService } from './character.service';
import { Character } from './entities/character.entity';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';

@Resolver(() => Character)
export class CharacterResolver {
    constructor(private readonly characterService: CharacterService) { }

    @Mutation(() => Character)
    createCharacter(@Args('data') data: CreateCharacterInput) {
        return this.characterService.create(data);
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
