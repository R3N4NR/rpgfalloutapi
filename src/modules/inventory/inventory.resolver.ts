import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InventoryService } from './inventory.service';

import { UserInputError } from 'apollo-server-express';
import { InventoryItem } from './entities/inventoryitem.entity';
import { CreateInventoryItemInput } from './dto/create-inventoryitem.input';
import { UpdateInventoryItemInput } from './dto/update-inventoryitem.input';

@Resolver(() => InventoryItem)
export class InventoryResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  /** Criar item no inventário */
  @Mutation(() => InventoryItem)
  async createInventoryItem(@Args('data') data: CreateInventoryItemInput) {
    if (!data.characterId?.trim()) throw new UserInputError('characterId is required');
    if (!data.itemId?.trim()) throw new UserInputError('itemId is required');
    if (data.quantity != null && data.quantity <= 0)
      throw new UserInputError('Quantity must be greater than 0');

    return this.inventoryService.create(data);
  }

  /** Buscar todos os itens do inventário */
  @Query(() => [InventoryItem], { name: 'inventoryItems' })
  findAll() {
    return this.inventoryService.findAll();
  }

  /** Buscar item do inventário pelo ID */
  @Query(() => InventoryItem, { name: 'inventoryItem' })
  async findOne(@Args('id') id: string) {
    if (!id.match(/^[a-f0-9-]+$/i)) throw new UserInputError('Invalid inventory item ID format');
    return this.inventoryService.findOne(id);
  }

  /** Atualizar item do inventário */
  @Mutation(() => InventoryItem)
  async updateInventoryItem(@Args('id') id: string, @Args('data') data: UpdateInventoryItemInput) {
    if (data.quantity != null && data.quantity <= 0)
      throw new UserInputError('Quantity must be greater than 0');

    return this.inventoryService.update(id, data);
  }

  /** Remover item do inventário */
  @Mutation(() => InventoryItem)
  async removeInventoryItem(@Args('id') id: string) {
    if (!id.match(/^[a-f0-9-]+$/i)) throw new UserInputError('Invalid inventory item ID format');
    return this.inventoryService.remove(id);
  }
}
