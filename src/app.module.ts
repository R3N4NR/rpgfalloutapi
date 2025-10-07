import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CharacterModule } from './modules/character/character.module';
import { UserModule } from './modules/user/user.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { HttpAdapterHost } from '@nestjs/core';
import { ItemModule } from './modules/item/item.module';
import { WeaponModule } from './modules/weapon/weapon.module';
import { ArmorModule } from './modules/armor/armor.module';
import { PerkModule } from './modules/perk/perk.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    CharacterModule,
    UserModule,
    ItemModule,
    WeaponModule,
    ArmorModule,
    PerkModule,
  ],
  controllers: [AppController],
  providers: [AppService, HttpAdapterHost]
})
export class AppModule { }
