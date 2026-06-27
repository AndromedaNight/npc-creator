export type Genre = "Modern Life Sim" | "Fantasy" | "Sci-Fi" | "Post-Apocalyptic"

export type Archetype =
  | "Student"
  | "Teacher"
  | "Barista"
  | "Office Worker"
  | "Artist"
  | "Mechanic"
  | "Nurse"
  | "Shop Owner"
  | "Librarian"
  | "Chef"
  | "Knight"
  | "Mage"
  | "Bard"
  | "Ranger"
  | "Alchemist"
  | "Innkeeper"
  | "Noble"
  | "Mercenary"
  | "Healer"
  | "Blacksmith"
  | "Druid"
  | "Merchant"
  | "Pilot"
  | "Engineer"
  | "Scientist"
  | "Smuggler"
  | "Android"
  | "Colonist"
  | "Security Officer"
  | "Bounty Hunter"
  | "Diplomat"
  | "Survivor"
  | "Scavenger"
  | "Medic"
  | "Trader"
  | "Raider"
  | "Farmer"

export const GENRES: Genre[] = [
  "Modern Life Sim",
  "Fantasy",
  "Sci-Fi",
  "Post-Apocalyptic",
]

export const ARCHETYPES: Archetype[] = [
  "Student",
  "Teacher",
  "Barista",
  "Office Worker",
  "Artist",
  "Mechanic",
  "Nurse",
  "Shop Owner",
  "Librarian",
  "Chef",
  "Knight",
  "Mage",
  "Bard",
  "Ranger",
  "Alchemist",
  "Innkeeper",
  "Noble",
  "Mercenary",
  "Healer",
  "Blacksmith",
  "Druid",
  "Merchant",
  "Pilot",
  "Engineer",
  "Scientist",
  "Smuggler",
  "Android",
  "Colonist",
  "Security Officer",
  "Bounty Hunter",
  "Diplomat",
  "Survivor",
  "Scavenger",
  "Medic",
  "Trader",
  "Raider",
  "Farmer",
]

export const ARCHETYPES_BY_GENRE: Record<Genre, Archetype[]> = {
  "Modern Life Sim": [
    "Student",
    "Teacher",
    "Barista",
    "Office Worker",
    "Artist",
    "Mechanic",
    "Nurse",
    "Shop Owner",
    "Librarian",
    "Chef",
  ],
  Fantasy: [
    "Knight",
    "Mage",
    "Bard",
    "Ranger",
    "Alchemist",
    "Innkeeper",
    "Noble",
    "Mercenary",
    "Healer",
    "Blacksmith",
    "Druid",
    "Merchant",
  ],
  "Sci-Fi": [
    "Pilot",
    "Engineer",
    "Scientist",
    "Smuggler",
    "Android",
    "Colonist",
    "Security Officer",
    "Bounty Hunter",
    "Diplomat",
  ],
  "Post-Apocalyptic": [
    "Survivor",
    "Scavenger",
    "Medic",
    "Trader",
    "Raider",
    "Farmer",
    "Mechanic",
  ],
}

export const CHARACTER_COUNTS = [1, 3, 5] as const
export type CharacterCount = (typeof CHARACTER_COUNTS)[number]

export interface GeneratorOptions {
  includeBackstory: boolean
  includeDailyRoutine: boolean
  includeRelationships: boolean
  includeDialogueStyle: boolean
}

export interface Relationship {
  name: string
  relation: string
}

export interface Character {
  id: string
  name: string
  age: number
  occupation: string
  genre: Genre
  archetype: Archetype
  personalityTraits: string[]
  likes: string[]
  dislikes: string[]
  goal: string
  fear: string
  backstory?: string
  dailyRoutine?: string
  relationships?: Relationship[]
  dialogueStyle?: string
  species?: string
  culturalBackground?: string
}
