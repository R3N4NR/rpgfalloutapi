import { PrismaClient, WeaponType, ArmorType, ArmorSlot, ItemType, QuestStatus } from '@prisma/client';

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
  const weapons = await prisma.weapon.createMany({
    data: [
      { name: '10mm Pistol', type: WeaponType.Pistol, damage: 25, value: 100, rarity: 'Common' },
      { name: 'Laser Rifle', type: WeaponType.Energy, damage: 45, value: 500, rarity: 'Rare' },
      { name: 'Baseball Bat', type: WeaponType.Melee, damage: 15, value: 30, rarity: 'Common' },
    ],
  });

  // 🛡️ Armaduras
  const armors = await prisma.armor.createMany({
    data: [
      { name: 'Leather Armor', type: ArmorType.Light, defense: 15, value: 150, slot: ArmorSlot.Chest },
      { name: 'Combat Helmet', type: ArmorType.Medium, defense: 10, value: 120, slot: ArmorSlot.Head },
      { name: 'Metal Boots', type: ArmorType.Heavy, defense: 8, value: 90, slot: ArmorSlot.Feet },
    ],
  });

  // 🧩 Perks
  const perks = await prisma.perk.createMany({
    data: [
      { name: 'Strong Back', description: 'Carry more weight.', requiredLevel: 3 },
      { name: 'Bloody Mess', description: 'More gore, more damage.', requiredLevel: 6 },
    ],
  });

  // 🎒 Itens
  const items = await prisma.item.createMany({
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
      weapons: {
        create: [
          {
            weapon: {
              connect: { name: '10mm Pistol' },
            },
            equipped: true,
          },
        ],
      },
      armors: {
        create: [
          {
            armor: {
              connect: { name: 'Leather Armor' },
            },
            equipped: true,
            slot: ArmorSlot.Chest,
          },
          {
            armor: {
              connect: { name: 'Combat Helmet' },
            },
            equipped: true,
            slot: ArmorSlot.Head,
          },
        ],
      },
      inventory: {
        create: [
          {
            item: { connect: { name: 'Stimpak' } },
            quantity: 3,
          },
          {
            item: { connect: { name: 'Bottlecap' } },
            quantity: 100,
          },
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
            weapon: {
              connect: { name: 'Baseball Bat' },
            },
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
      },
      {
        title: 'Find the Lost Holotape',
        description: 'Recover the lost Brotherhood holotape.',
        status: QuestStatus.InProgress,
        rewardCaps: 200,
        experience: 250,
        characterId: character2.id,
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
