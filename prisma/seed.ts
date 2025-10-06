import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do RPG...');

  // 🏛 Facções
  await prisma.faction.createMany({
    data: [
      { name: 'Irmandade de Aço', description: 'Tecnocratas que veneram a tecnologia pré-guerra.', alignment: 'Lawful Neutral' },
      { name: 'Nova Califórnia Republic', description: 'Democracia militar expansionista.', alignment: 'Lawful Good' },
      { name: 'Raiders', description: 'Gangues violentas que vivem do saque.', alignment: 'Chaotic Evil' },
    ],
  });

  // 🧠 Skills
  await prisma.skill.createMany({
    data: [
      { name: 'Small Guns', description: 'Precisão com armas de pequeno porte', baseStat: 'agility' },
      { name: 'Energy Weapons', description: 'Uso de rifles e pistolas de energia', baseStat: 'perception' },
      { name: 'Speech', description: 'Capacidade de persuasão e negociação', baseStat: 'charisma' },
      { name: 'Lockpick', description: 'Abrir fechaduras e cofres', baseStat: 'perception' },
      { name: 'Sneak', description: 'Habilidade de se mover furtivamente', baseStat: 'agility' },
    ],
  });

  // 💥 Perks
  await prisma.perk.createMany({
    data: [
      { name: 'Bloody Mess', description: 'Você causa +5% de dano e deixa um rastro sangrento.', requiredLevel: 6 },
      { name: 'Toughness', description: '+10 de resistência a dano físico.', requiredLevel: 4 },
      { name: 'Gun Nut', description: '+10% de precisão com armas de fogo.', requiredLevel: 3 },
      { name: 'Educated', description: 'Ganha mais XP por ação completada.', requiredLevel: 2 },
    ],
  });

  // 🔫 Armas
  await prisma.weapon.createMany({
    data: [
      { name: 'Faca de Combate', type: 'Melee', damage: 12, range: 1, weight: 1.0, value: 25, rarity: 'common' },
      { name: 'Pistola 10mm', type: 'Pistol', damage: 20, range: 15, weight: 2.0, value: 75, rarity: 'common', ammoType: '10mm' },
      { name: 'Rifle de Assalto', type: 'Rifle', damage: 35, range: 40, weight: 5.5, value: 250, rarity: 'uncommon', ammoType: '5.56mm' },
      { name: 'Rifle a Laser', type: 'Energy', damage: 45, range: 50, weight: 4.0, value: 400, rarity: 'rare', ammoType: 'microfusion cell' },
      { name: 'Lança-Mísseis', type: 'Explosive', damage: 100, range: 60, weight: 10.0, value: 1000, rarity: 'legendary', ammoType: 'missile' },
    ],
  });

  // 🪖 Armaduras
  await prisma.armor.createMany({
    data: [
      { name: 'Roupa de Couro', type: 'Light', defense: 10, weight: 3.0, value: 50, rarity: 'common' },
      { name: 'Armadura de Combate', type: 'Medium', defense: 25, weight: 8.0, value: 200, rarity: 'uncommon' },
      { name: 'Power Armor T-45d', type: 'PowerArmor', defense: 50, weight: 20.0, value: 1000, rarity: 'legendary' },
    ],
  });

  // 🧪 Itens
  await prisma.item.createMany({
    data: [
      { name: 'Stimpak', type: 'Consumable', description: 'Recupera 30 HP.', value: 50, effects: { hp: +30 } },
      { name: 'RadAway', type: 'Aid', description: 'Remove 30 de radiação.', value: 60, effects: { radiation: -30 } },
      { name: 'Água Purificada', type: 'Consumable', description: 'Recupera 15 HP.', value: 20, effects: { hp: +15 } },
      { name: 'Caps', type: 'Material', description: 'Moeda padrão das Wastelands.', value: 1 },
      { name: 'Munição 10mm', type: 'Ammo', description: 'Cartuchos para pistolas 10mm.', value: 5 },
    ],
  });

  // 👤 Personagem inicial
  const faction = await prisma.faction.findFirst({ where: { name: 'Nova Califórnia Republic' } });

  const character = await prisma.character.create({
    data: {
      name: 'Vault Dweller',
      level: 1,
      experience: 0,
      strength: 5,
      perception: 5,
      endurance: 5,
      charisma: 5,
      intelligence: 5,
      agility: 5,
      luck: 5,
      hitPoints: 100,
      actionPoints: 50,
      radiation: 0,
      caps: 50,
      factionId: faction?.id,
    },
  });
  console.log('✅ Personagem inicial criado:', character.name);

  // 🧩 Equipamentos e inventário inicial
  const pistol = await prisma.weapon.findFirst({ where: { name: 'Pistola 10mm' } });
  const armor = await prisma.armor.findFirst({ where: { name: 'Roupa de Couro' } });
  const stimpak = await prisma.item.findFirst({ where: { name: 'Stimpak' } });

  if (pistol && armor && stimpak) {
    await prisma.characterWeapon.create({
      data: {
        characterId: character.id,
        weaponId: pistol.id,
        equipped: true,
      },
    });
    await prisma.characterArmor.create({
      data: {
        characterId: character.id,
        armorId: armor.id,
        equipped: true,
      },
    });
    await prisma.inventoryItem.create({
      data: {
        characterId: character.id,
        itemId: stimpak.id,
        quantity: 3,
      },
    });
  }

  // 🗺️ Missões (Quests)
  await prisma.quest.createMany({
    data: [
      {
        title: 'Reparar o Gerador do Refúgio',
        description: 'O gerador principal falhou. Encontre peças e restaure a energia.',
        rewardCaps: 100,
        experience: 300,
        status: 'Pending',
        characterId: character.id,
      },
      {
        title: 'Caçar os Raiders da Estrada 95',
        description: 'Grupos de saqueadores estão atacando caravanas próximas. Elimine a ameaça.',
        rewardCaps: 200,
        experience: 600,
        status: 'Pending',
        characterId: character.id,
      },
      {
        title: 'Ajudar o Fazendeiro de Junktown',
        description: 'Você ajudou um fazendeiro a se livrar de radscorpions.',
        rewardCaps: 50,
        experience: 150,
        status: 'Pending',
        characterId: character.id,
      },
    ],
  });

  console.log('✅ Missões criadas e vinculadas ao personagem.');
  console.log('🌎 Seed completo!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
