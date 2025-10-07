import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './entities/inventoryitem.entity';
import { CreateInventoryItemInput } from './dto/create-inventoryitem.input';
import { UpdateInventoryItemInput } from './dto/update-inventoryitem.input';

@Resolver(() => InventoryItem)
export class InventoryResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  @Mutation(() => InventoryItem)
  addInventoryItem(@Args('data') data: CreateInventoryItemInput) {
    return this.inventoryService.create(data);
  }

  @Query(() => [InventoryItem], { name: 'inventoryItems' })
  findAll() {
    return this.inventoryService.findAll();
  }

  @Query(() => [InventoryItem], { name: 'characterInventory' })
  findByCharacter(@Args('characterId') characterId: string) {
    return this.inventoryService.findByCharacter(characterId);
  }

  @Mutation(() => InventoryItem)
  updateInventoryItem(@Args('data') data: UpdateInventoryItemInput) {
    return this.inventoryService.update(data?.id, data);
  }

  @Mutation(() => InventoryItem)
  removeInventoryItem(@Args('id') id: string) {
    return this.inventoryService.remove(id);
  }
}
