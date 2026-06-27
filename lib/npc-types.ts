export type Genre = "Modern Life Sim" | "Fantasy" | "Sci-Fi"

export type Archetype =
  | "Student"
  | "Shopkeeper"
  | "Office Worker"
  | "Artist"
  | "Adventurer"
  | "Merchant"
  | "Noble"
  | "Farmer"

export const GENRES: Genre[] = ["Modern Life Sim", "Fantasy", "Sci-Fi"]

export const ARCHETYPES: Archetype[] = [
  "Student",
  "Shopkeeper",
  "Office Worker",
  "Artist",
  "Adventurer",
  "Merchant",
  "Noble",
  "Farmer",
]

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
