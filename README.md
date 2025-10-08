# 🧭 RPG API — NestJS + GraphQL + Prisma + MySQL

API de RPG construída com NestJS, GraphQL e Prisma, com banco de dados MySQL. Inclui gerenciamento de personagens, inventário, armas, armaduras, perks, quests e usuários.

## 🧱 Tecnologias utilizadas

[![Skills](https://skillicons.dev/icons?i=nestjs,graphql,prisma,mysql,typescript,jest,supertest)](https://skillicons.dev)

- **NestJS** — Estrutura principal do backend  
- **GraphQL** — API GraphQL com Apollo  
- **Prisma** — ORM para MySQL  
- **MySQL** — Banco de dados relacional  
- **TypeScript** — Linguagem principal  
- **Jest** — Testes unitários e e2e  
- **Supertest** — Testes de integração HTTP 
- **Gitmoji** — [![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.dev)

✨ Gitmoji — Convenção para commits

⚙️ Funcionalidades implementadas
1️⃣ Characters

CRUD completo

Equip/unequip de armas e armaduras

Relações: weapons, armors, perks, inventory

Tratamento de erros e validação

2️⃣ Items

CRUD completo

Itens genéricos para inventário

Validação e tratamento de erros

3️⃣ Weapons

CRUD completo

Enum WeaponType

Validação e tratamento de erros

4️⃣ Armor

CRUD completo

Enum ArmorType e slots (Arms, Chest, Feet, Head, Legs)

Equip/unequip por slot com tabela de junção (CharacterArmor)

Validação e tratamento de erros

5️⃣ Perks

CRUD completo

effects armazenados em JSON

Validação e tratamento de erros

6️⃣ Quest

CRUD completo

Enum QuestStatus (NotStarted, InProgress, Completed)

Relacionamentos com Character

Validação e tratamento de erros

7️⃣ Inventory

CRUD de InventoryItem

Queries para consultar inventário do personagem

Tratamento de erros

8️⃣ Equipamento

Equip/unequip de armas e armaduras

upsert com suporte a slot único por personagem

Tratamento de erros

9️⃣ User

CRUD completo

Validação e tratamento de erros

⚡ Scripts úteis
# Rodar a aplicação
npm run start:dev

# Rodar testes unitários
npm run test

# Rodar testes e2e
npm run test:e2e

# Gerar e aplicar migrations
npx prisma migrate dev --name init

# Popular banco com seed
npx prisma db seed
