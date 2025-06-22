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

export const VALORANT_SKINS: Skin[] = [
  // LEGENDARY
  {
    id: "recon-balisong",
    name: "Recon Balisong",
    weapon: "Melee",
    rarity: "Legendary",
    collection: "Recon Collection",
    price: 4350,
    image: "/images/recon-balisong.png",
  },
  {
    id: "prime-karambit",
    name: "Prime Karambit",
    weapon: "Melee",
    rarity: "Legendary",
    collection: "Prime Collection",
    price: 4350,
    image: "/images/prime-karambit.png",
  },
  {
    id: "glitchpop-dagger",
    name: "Glitchpop Dagger",
    weapon: "Melee",
    rarity: "Legendary",
    collection: "Glitchpop Collection",
    price: 4350,
    image: "/images/glitchpop-dagger.png",
  },
  {
    id: "elderflame-dagger",
    name: "Elderflame Dagger",
    weapon: "Melee",
    rarity: "Legendary",
    collection: "Elderflame Collection",
    price: 4350,
    image: "/images/elderflame-dagger.png",
  },
  {
    id: "sovereign-sword",
    name: "Sovereign Sword",
    weapon: "Melee",
    rarity: "Legendary",
    collection: "Sovereign Collection",
    price: 4350,
    image: "/images/sovereign-sword.png",
  },

  // EPIC
  {
    id: "prime-vandal",
    name: "Prime Vandal",
    weapon: "Vandal",
    rarity: "Epic",
    collection: "Prime Collection",
    price: 1775,
    image: "/images/prime-vandal.png",
  },
  {
    id: "elderflame-operator",
    name: "Elderflame Operator",
    weapon: "Operator",
    rarity: "Epic",
    collection: "Elderflame Collection",
    price: 1775,
    image: "/images/elderflame-operator.png",
  },
  {
    id: "glitchpop-phantom",
    name: "Glitchpop Phantom",
    weapon: "Phantom",
    rarity: "Epic",
    collection: "Glitchpop Collection",
    price: 1775,
    image: "/images/glitchpop-phantom.png",
  },
  {
    id: "ion-phantom",
    name: "Ion Phantom",
    weapon: "Phantom",
    rarity: "Epic",
    collection: "Ion Collection",
    price: 1775,
    image: "/images/ion-phantom.png",
  },
  {
    id: "reaver-vandal",
    name: "Reaver Vandal",
    weapon: "Vandal",
    rarity: "Epic",
    collection: "Reaver Collection",
    price: 1775,
    image: "/images/reaver-vandal.png",
  },
  {
    id: "singularity-phantom",
    name: "Singularity Phantom",
    weapon: "Phantom",
    rarity: "Epic",
    collection: "Singularity Collection",
    price: 1775,
    image: "/images/singularity-phantom.png",
  },
  {
    id: "oni-phantom",
    name: "Oni Phantom",
    weapon: "Phantom",
    rarity: "Epic",
    collection: "Oni Collection",
    price: 1775,
    image: "/images/oni-phantom.png",
  },
  {
    id: "dragon-vandal",
    name: "Dragon Vandal",
    weapon: "Vandal",
    rarity: "Epic",
    collection: "Dragon Collection",
    price: 1775,
    image: "/images/dragon-vandal.png",
  },

  // RARE
  {
    id: "sovereign-ghost",
    name: "Sovereign Ghost",
    weapon: "Ghost",
    rarity: "Rare",
    collection: "Sovereign Collection",
    price: 875,
    image: "/images/sovereign-ghost.png",
  },
  {
    id: "reaver-sheriff",
    name: "Reaver Sheriff",
    weapon: "Sheriff",
    rarity: "Rare",
    collection: "Reaver Collection",
    price: 875,
    image: "/images/reaver-sheriff.png",
  },
  {
    id: "ion-sheriff",
    name: "Ion Sheriff",
    weapon: "Sheriff",
    rarity: "Rare",
    collection: "Ion Collection",
    price: 875,
    image: "/images/ion-sheriff.png",
  },
  {
    id: "prime-spectre",
    name: "Prime Spectre",
    weapon: "Spectre",
    rarity: "Rare",
    collection: "Prime Collection",
    price: 875,
    image: "/images/prime-spectre.png",
  },
  {
    id: "glitchpop-judge",
    name: "Glitchpop Judge",
    weapon: "Judge",
    rarity: "Rare",
    collection: "Glitchpop Collection",
    price: 875,
    image: "/images/glitchpop-judge.png",
  },
  {
    id: "elderflame-judge",
    name: "Elderflame Judge",
    weapon: "Judge",
    rarity: "Rare",
    collection: "Elderflame Collection",
    price: 875,
    image: "/images/elderflame-judge.png",
  },
  {
    id: "oni-shorty",
    name: "Oni Shorty",
    weapon: "Shorty",
    rarity: "Rare",
    collection: "Oni Collection",
    price: 875,
    image: "/images/oni-shorty.png",
  },
  {
    id: "recon-guardian",
    name: "Recon Guardian",
    weapon: "Guardian",
    rarity: "Rare",
    collection: "Recon Collection",
    price: 875,
    image: "/images/recon-guardian.png",
  },

  // COMMON
  {
    id: "avalanche-spectre",
    name: "Avalanche Spectre",
    weapon: "Spectre",
    rarity: "Common",
    collection: "Avalanche Collection",
    price: 275,
    image: "/images/avalanche-spectre.png",
  },
  {
    id: "convex-bulldog",
    name: "Convex Bulldog",
    weapon: "Bulldog",
    rarity: "Common",
    collection: "Convex Collection",
    price: 275,
    image: "/images/convex-bulldog.png",
  },
  {
    id: "dot-exe-vandal",
    name: "Dot EXE Vandal",
    weapon: "Vandal",
    rarity: "Common",
    collection: "Dot EXE Collection",
    price: 275,
    image: "/images/dot-exe-vandal.png",
  },
  {
    id: "smite-classic",
    name: "Smite Classic",
    weapon: "Classic",
    rarity: "Common",
    collection: "Smite Collection",
    price: 275,
    image: "/images/smite-classic.png",
  },
  {
    id: "surge-spectre",
    name: "Surge Spectre",
    weapon: "Spectre",
    rarity: "Common",
    collection: "Surge Collection",
    price: 275,
    image: "/images/surge-spectre.png",
  },
  {
    id: "tethered-realms-ghost",
    name: "Tethered Realms Ghost",
    weapon: "Ghost",
    rarity: "Common",
    collection: "Tethered Realms Collection",
    price: 275,
    image: "/images/tethered-realms-ghost.png",
  },
  {
    id: "luxe-operator",
    name: "Luxe Operator",
    weapon: "operator",
    rarity: "Common",
    collection: "Luxe Collection",
    price: 275,
    image: "/images/luxe-operator.png",
  },
  {
    id: "rush-frenzy",
    name: "Rush Frenzy",
    weapon: "Frenzy",
    rarity: "Common",
    collection: "Rush Collection",
    price: 275,
    image: "/images/rush-frenzy.png",
  },
  {
    id: "infantry-spectre",
    name: "Infantry Spectre",
    weapon: "Spectre",
    rarity: "Common",
    collection: "Infantry Collection",
    price: 275,
    image: "/images/infantry-spectre.png",
  },
  {
    id: "ego-vandal",
    name: "Ego Vandal",
    weapon: "Vandal",
    rarity: "Common",
    collection: "Ego Collection",
    price: 1775,
    image: "/images/ego-vandal.png",
  },
  {
    id: "nunca-olvidados-bulldog",
    name: "Nunca Olvidados Bulldog",
    weapon: "Bulldog",
    rarity: "Common",
    collection: "Nunca Olvidados Collection",
    price: 1275,
    image: "/images/nunca-olvidados-bulldog.png",
  },
  {
    id: "artisan-ghost",
    name: "Artisan Ghost",
    weapon: "Ghost",
    rarity: "Common",
    collection: "Artisan Collection",
    price: 275,
    image: "/images/artisan-ghost.png",
  },
]

export const CASE_TYPES: CaseType[] = [
  {
    id: "legendary-case",
    name: "Caixa Lendária",
    description: "Chance de conseguir facas raras e skins épicas! Melhor chance de itens lendários.",
    price: 15.0,
    image: "/images/legendary-case.png",
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
    image: "/images/premium-case.png",
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
    image: "/images/basic-case.png",
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
