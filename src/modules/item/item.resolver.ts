import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { UserInputError } from 'apollo-server-express';

@Resolver(() => Item)
export class ItemResolver {
    constructor(private readonly itemService: ItemService) { }

    /** Criar item */
    @Mutation(() => Item)
    async createItem(@Args('data') data: CreateItemInput) {
        if (!data.name?.trim()) throw new UserInputError('Item name cannot be empty');
        if (!data.type) throw new UserInputError('Item type is required');
        if (data.value != null && data.value < 0)
            throw new UserInputError('Item value cannot be negative');

        return this.itemService.create(data);
    }

    /** Buscar todos os itens */
    @Query(() => [Item], { name: 'items' })
    findAll() {
        return this.itemService.findAll();
    }

    /** Buscar item pelo ID */
    @Query(() => Item, { name: 'item' })
    async findOne(@Args('id') id: string) {
        if (!id.match(/^[a-f0-9-]+$/i)) throw new UserInputError('Invalid item ID format');
        return this.itemService.findOne(id);
    }

    /** Atualizar item */
    @Mutation(() => Item)
    async updateItem(@Args('id') id: string, @Args('data') data: UpdateItemInput) {
        if (data.name && !data.name.trim()) throw new UserInputError('Item name cannot be empty');
        if (data.value != null && data.value < 0)
            throw new UserInputError('Item value cannot be negative');

        return this.itemService.update(id, data);
    }

    /** Remover item */
    @Mutation(() => Item)
    async removeItem(@Args('id') id: string) {
        if (!id.match(/^[a-f0-9-]+$/i)) throw new UserInputError('Invalid item ID format');
        return this.itemService.remove(id);
    }
}
