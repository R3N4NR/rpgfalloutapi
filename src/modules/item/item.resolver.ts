import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';


@Resolver(() => Item)
export class ItemResolver {
    constructor(private readonly itemService: ItemService) { }

    @Mutation(() => Item)
    createItem(@Args('data') data: CreateItemInput) {
        return this.itemService.create(data);
    }

    @Query(() => [Item])
    items() {
        return this.itemService.findAll();
    }

    @Query(() => Item)
    item(@Args('id') id: string) {
        return this.itemService.findOne(id);
    }

    @Mutation(() => Item)
    updateItem(@Args('data') data: UpdateItemInput ) {
        return this.itemService.update(data?.id , data);
    }

    @Mutation(() => Item)
    removeItem(@Args('id') id: string) {
        return this.itemService.remove(id);
    }
}
