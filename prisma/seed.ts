import {
  PrismaClient,
  WeaponType,
  ArmorType,
  ArmorSlot,
  ItemType,
  QuestStatus,
  EnemyType,
  ResistanceType,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // 🧑 Usuário
  const user = await prisma.user.create({
    data: {
      name: 'Vault Dweller',
    },
  });

  // ⚔️ Armas
  await prisma.weapon.createMany({
    data: [
      { name: '10mm Pistol', type: WeaponType.Pistol, damage: 25, value: 100, rarity: 'Common' },
      { name: 'Laser Rifle', type: WeaponType.Energy, damage: 45, value: 500, rarity: 'Rare' },
      { name: 'Baseball Bat', type: WeaponType.Melee, damage: 15, value: 30, rarity: 'Common' },
    ],
  });

  // 🛡️ Armaduras
  await prisma.armor.createMany({
    data: [
      { name: 'Leather Armor', type: ArmorType.Light, defense: 15, value: 150, slot: ArmorSlot.Chest, rarity: 'Common', weight: 12.5 },
      { name: 'Combat Helmet', type: ArmorType.Medium, defense: 10, value: 120, slot: ArmorSlot.Head, rarity: 'Common', weight: 8.5 },
      { name: 'Metal Boots', type: ArmorType.Heavy, defense: 8, value: 90, slot: ArmorSlot.Feet, rarity: 'Common', weight: 10.0 },
    ],
  });

  // 🧩 Perks
  await prisma.perk.createMany({
    data: [
      { name: 'Strong Back', description: 'Carry more weight.', requiredLevel: 3 },
      { name: 'Bloody Mess', description: 'More gore, more damage.', requiredLevel: 6 },
    ],
  });

  // 🎒 Itens
  await prisma.item.createMany({
    data: [
      { name: 'Stimpak', type: ItemType.Consumable, description: 'Heals 30 HP.', value: 50 },
      { name: 'RadAway', type: ItemType.Aid, description: 'Reduces radiation.', value: 80 },
      { name: 'Bottlecap', type: ItemType.Material, value: 1 },
    ],
  });

  // 🛡️ Fação
  const faction = await prisma.faction.create({
    data: {
      name: 'Brotherhood of Steel',
      description: 'Technological preservation faction.',
      alignment: 'Lawful Neutral',
      reputation: 10,
    },
  });

  // 🌍 Localização
  const location = await prisma.location.create({
    data: {
      name: 'Concord Ruins',
      spawnType: EnemyType.SuperMutant,
      discovered: true,
    },
  });

  // 🧑‍💬 NPCs
  await prisma.npc.createMany({
    data: [
      {
        name: 'Preston Garvey',
        dialogue: JSON.stringify({
          intro: "Another settlement needs your help!",
          farewell: "Stay safe out there, General.",
        }),
        locationId: location.id,
      },
      {
        name: 'Sturges',
        dialogue: JSON.stringify({
          intro: "We could really use your help fixing this place up.",
        }),
        locationId: location.id,
      },
    ],
  });

  // 👾 Inimigos
  const enemy = await prisma.enemy.create({
    data: {
      name: 'Super Mutant Brute',
      level: 6,
      damage: 25,
      hitPoints: 120,
      resistances: ResistanceType.Physical,
      type: EnemyType.SuperMutant,
      hostile: true,
      drops: {
        create: [
          {
            item: { connect: { name: 'Bottlecap' } },
            dropRate: 0.75,
          },
          {
            item: { connect: { name: 'Stimpak' } },
            dropRate: 0.3,
          },
        ],
      },
    },
  });

  // 🎮 Personagens
  const character1 = await prisma.character.create({
    data: {
      name: 'Aiden Steel',
      level: 5,
      experience: 450,
      strength: 7,
      perception: 6,
      endurance: 5,
      charisma: 4,
      intelligence: 6,
      agility: 5,
      luck: 5,
      userId: user.id,
      factionId: faction.id,
      locationId: location.id,
      weapons: {
        create: [
          {
            weapon: { connect: { name: '10mm Pistol' } },
            equipped: true,
          },
        ],
      },
      armors: {
        create: [
          {
            armor: { connect: { name: 'Leather Armor' } },
            equipped: true,
            slot: ArmorSlot.Chest,
          },
          {
            armor: { connect: { name: 'Combat Helmet' } },
            equipped: true,
            slot: ArmorSlot.Head,
          },
        ],
      },
      inventory: {
        create: [
          { item: { connect: { name: 'Stimpak' } }, quantity: 3 },
          { item: { connect: { name: 'Bottlecap' } }, quantity: 100 },
        ],
      },
    },
  });

  const character2 = await prisma.character.create({
    data: {
      name: 'Nora Vault',
      level: 2,
      experience: 120,
      strength: 5,
      perception: 5,
      endurance: 5,
      charisma: 5,
      intelligence: 5,
      agility: 5,
      luck: 5,
      userId: user.id,
      weapons: {
        create: [
          {
            weapon: { connect: { name: 'Baseball Bat' } },
            equipped: true,
          },
        ],
      },
      armors: {
        create: [
          {
            armor: { connect: { name: 'Metal Boots' } },
            equipped: true,
            slot: ArmorSlot.Feet,
          },
        ],
      },
    },
  });

  // 🎯 Missões
  await prisma.quest.createMany({
    data: [
      {
        title: 'Clear the Super Mutant Camp',
        description: 'Eliminate all super mutants in the area.',
        status: QuestStatus.Pending,
        rewardCaps: 300,
        experience: 500,
        characterId: character1.id,
        locationId: location.id,
      },
      {
        title: 'Find the Lost Holotape',
        description: 'Recover the lost Brotherhood holotape.',
        status: QuestStatus.InProgress,
        rewardCaps: 200,
        experience: 250,
        characterId: character2.id,
        locationId: location.id,
      },
    ],
  });

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao rodar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
