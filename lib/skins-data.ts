export interface Skin {
  id: string
  name: string
  weapon: string
  rarity: "Legendary" | "Epic" | "Rare" | "Common"
  collection: string
  price: number
  image: string
}

export interface CaseType {
  id: string
  name: string
  description: string
  price: number
  image: string
  probabilities: {
    Legendary: number
    Epic: number
    Rare: number
    Common: number
  }
}

// Dados reais das skins do Valorant organizadas por raridade
export const VALORANT_SKINS: Skin[] = [
  // LEGENDARY SKINS (Facas e skins ultra raras) - 1%
  {
    id: "recon-balisong",
    name: "Recon Balisong",
    weapon: "Melee",
    rarity: "Legendary",
    collection: "Recon Collection",
    price: 4350,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "prime-karambit",
    name: "Prime Karambit",
    weapon: "Melee",
    rarity: "Legendary",
    collection: "Prime Collection",
    price: 4350,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "glitchpop-dagger",
    name: "Glitchpop Dagger",
    weapon: "Melee",
    rarity: "Legendary",
    collection: "Glitchpop Collection",
    price: 4350,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "elderflame-dagger",
    name: "Elderflame Dagger",
    weapon: "Melee",
    rarity: "Legendary",
    collection: "Elderflame Collection",
    price: 4350,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "sovereign-sword",
    name: "Sovereign Sword",
    weapon: "Melee",
    rarity: "Legendary",
    collection: "Sovereign Collection",
    price: 4350,
    image: "/placeholder.svg?height=100&width=150",
  },

  // EPIC SKINS (Skins premium) - 5-10%
  {
    id: "prime-vandal",
    name: "Prime Vandal",
    weapon: "Vandal",
    rarity: "Epic",
    collection: "Prime Collection",
    price: 1775,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "elderflame-operator",
    name: "Elderflame Operator",
    weapon: "Operator",
    rarity: "Epic",
    collection: "Elderflame Collection",
    price: 1775,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "glitchpop-phantom",
    name: "Glitchpop Phantom",
    weapon: "Phantom",
    rarity: "Epic",
    collection: "Glitchpop Collection",
    price: 1775,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "ion-phantom",
    name: "Ion Phantom",
    weapon: "Phantom",
    rarity: "Epic",
    collection: "Ion Collection",
    price: 1775,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "reaver-vandal",
    name: "Reaver Vandal",
    weapon: "Vandal",
    rarity: "Epic",
    collection: "Reaver Collection",
    price: 1775,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "singularity-phantom",
    name: "Singularity Phantom",
    weapon: "Phantom",
    rarity: "Epic",
    collection: "Singularity Collection",
    price: 1775,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "oni-phantom",
    name: "Oni Phantom",
    weapon: "Phantom",
    rarity: "Epic",
    collection: "Oni Collection",
    price: 1775,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "dragon-vandal",
    name: "Dragon Vandal",
    weapon: "Vandal",
    rarity: "Epic",
    collection: "Dragon Collection",
    price: 1775,
    image: "/placeholder.svg?height=100&width=150",
  },

  // RARE SKINS (Skins de qualidade) - 15-25%
  {
    id: "sovereign-ghost",
    name: "Sovereign Ghost",
    weapon: "Ghost",
    rarity: "Rare",
    collection: "Sovereign Collection",
    price: 875,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "reaver-sheriff",
    name: "Reaver Sheriff",
    weapon: "Sheriff",
    rarity: "Rare",
    collection: "Reaver Collection",
    price: 875,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "ion-sheriff",
    name: "Ion Sheriff",
    weapon: "Sheriff",
    rarity: "Rare",
    collection: "Ion Collection",
    price: 875,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "prime-spectre",
    name: "Prime Spectre",
    weapon: "Spectre",
    rarity: "Rare",
    collection: "Prime Collection",
    price: 875,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "glitchpop-judge",
    name: "Glitchpop Judge",
    weapon: "Judge",
    rarity: "Rare",
    collection: "Glitchpop Collection",
    price: 875,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "elderflame-judge",
    name: "Elderflame Judge",
    weapon: "Judge",
    rarity: "Rare",
    collection: "Elderflame Collection",
    price: 875,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "oni-shorty",
    name: "Oni Shorty",
    weapon: "Shorty",
    rarity: "Rare",
    collection: "Oni Collection",
    price: 875,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "recon-guardian",
    name: "Recon Guardian",
    weapon: "Guardian",
    rarity: "Rare",
    collection: "Recon Collection",
    price: 875,
    image: "/placeholder.svg?height=100&width=150",
  },

  // COMMON SKINS (Skins básicas) - 60-79%
  {
    id: "avalanche-spectre",
    name: "Avalanche Spectre",
    weapon: "Spectre",
    rarity: "Common",
    collection: "Avalanche Collection",
    price: 275,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "convex-vandal",
    name: "Convex Vandal",
    weapon: "Vandal",
    rarity: "Common",
    collection: "Convex Collection",
    price: 275,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "dot-exe-vandal",
    name: "Dot EXE Vandal",
    weapon: "Vandal",
    rarity: "Common",
    collection: "Dot EXE Collection",
    price: 275,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "smite-classic",
    name: "Smite Classic",
    weapon: "Classic",
    rarity: "Common",
    collection: "Smite Collection",
    price: 275,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "surge-spectre",
    name: "Surge Spectre",
    weapon: "Spectre",
    rarity: "Common",
    collection: "Surge Collection",
    price: 275,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "tethered-realms-phantom",
    name: "Tethered Realms Phantom",
    weapon: "Phantom",
    rarity: "Common",
    collection: "Tethered Realms Collection",
    price: 275,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "luxe-classic",
    name: "Luxe Classic",
    weapon: "Classic",
    rarity: "Common",
    collection: "Luxe Collection",
    price: 275,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "rush-frenzy",
    name: "Rush Frenzy",
    weapon: "Frenzy",
    rarity: "Common",
    collection: "Rush Collection",
    price: 275,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "infantry-spectre",
    name: "Infantry Spectre",
    weapon: "Spectre",
    rarity: "Common",
    collection: "Infantry Collection",
    price: 275,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "couture-judge",
    name: "Couture Judge",
    weapon: "Judge",
    rarity: "Common",
    collection: "Couture Collection",
    price: 275,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "nunca-olvidados-classic",
    name: "Nunca Olvidados Classic",
    weapon: "Classic",
    rarity: "Common",
    collection: "Nunca Olvidados Collection",
    price: 275,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: "artisan-stinger",
    name: "Artisan Stinger",
    weapon: "Stinger",
    rarity: "Common",
    collection: "Artisan Collection",
    price: 275,
    image: "/placeholder.svg?height=100&width=150",
  },
]

export const CASE_TYPES: CaseType[] = [
  {
    id: "legendary-case",
    name: "Caixa Lendária",
    description: "Chance de conseguir facas raras e skins épicas! Melhor chance de itens lendários.",
    price: 15.0,
    image: "/placeholder.svg?height=200&width=200",
    probabilities: {
      Legendary: 1,
      Epic: 10,
      Rare: 25,
      Common: 64,
    },
  },
  {
    id: "premium-case",
    name: "Caixa Premium",
    description: "Skins de alta qualidade com ótimas chances de itens épicos e raros!",
    price: 8.0,
    image: "/placeholder.svg?height=200&width=200",
    probabilities: {
      Legendary: 0,
      Epic: 5,
      Rare: 20,
      Common: 75,
    },
  },
  {
    id: "basic-case",
    name: "Caixa Básica",
    description: "Perfeita para começar sua coleção! Boa chance de skins raras.",
    price: 3.0,
    image: "/placeholder.svg?height=200&width=200",
    probabilities: {
      Legendary: 0,
      Epic: 0,
      Rare: 15,
      Common: 85,
    },
  },
]

export function getSkinsByRarity(rarity: string): Skin[] {
  return VALORANT_SKINS.filter((skin) => skin.rarity === rarity)
}

export function getSkinById(id: string): Skin | undefined {
  return VALORANT_SKINS.find((skin) => skin.id === id)
}

export function getCaseById(id: string): CaseType | undefined {
  return CASE_TYPES.find((caseType) => caseType.id === id)
}
