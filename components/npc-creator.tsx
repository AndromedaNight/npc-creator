"use client"

import { useState } from "react"
import { AlertCircle, Users } from "lucide-react"

import {
  ARCHETYPES_BY_GENRE,
  type Archetype,
  type Character,
  type CharacterCount,
  type Genre,
  type GeneratorOptions,
} from "@/lib/npc-types"
import { CharacterCard } from "@/components/character-card"
import { CharacterCardSkeleton } from "@/components/character-card-skeleton"
import { NpcGenerator } from "@/components/npc-generator"

interface ApiCharacter {
  name: string
  age: number
  occupation: string
  traits: string[]
  likes: string[]
  dislikes: string[]
  goal: string
  fear: string
  backstory: string | null
  dailyRoutine: string | null
  relationships: { name: string; relation: string }[] | null
  dialogueStyle: string | null
  species?: string
  culturalBackground?: string
}

export function NpcCreator() {
  const [genre, setGenre] = useState<Genre>("Modern Life Sim")
  const [archetype, setArchetype] = useState<Archetype>("Student")
  const [count, setCount] = useState<CharacterCount>(3)
  const [options, setOptions] = useState<GeneratorOptions>({
    includeBackstory: true,
    includeDailyRoutine: false,
    includeRelationships: false,
    includeDialogueStyle: true,
  })

  const [characters, setCharacters] = useState<Character[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [hasGenerated, setHasGenerated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleGenreChange(nextGenre: Genre) {
    setGenre(nextGenre)
    const compatibleArchetypes = ARCHETYPES_BY_GENRE[nextGenre]
    if (!compatibleArchetypes.includes(archetype)) {
      setArchetype(compatibleArchetypes[0])
    }
  }

  async function handleGenerate() {
    setIsLoading(true)
    setError(null)
    setHasGenerated(true)

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genre, archetype, count, options }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string; detail?: string }
          | null
        throw new Error(data?.detail ?? data?.error ?? "Something went wrong.")
      }

      const data = (await res.json()) as { characters: ApiCharacter[] }

      const mapped: Character[] = (data.characters ?? []).map((c, index) => ({
        id: `${Date.now()}-${index}`,
        name: c.name,
        age: c.age,
        occupation: c.occupation,
        genre,
        archetype,
        personalityTraits: c.traits ?? [],
        likes: c.likes ?? [],
        dislikes: c.dislikes ?? [],
        goal: c.goal,
        fear: c.fear,
        backstory: c.backstory ?? undefined,
        dailyRoutine: c.dailyRoutine ?? undefined,
        relationships: c.relationships ?? undefined,
        dialogueStyle: c.dialogueStyle ?? undefined,
        species: c.species,
        culturalBackground: c.culturalBackground,
      }))

      setCharacters(mapped)
    } catch (err) {
      console.error("[v0] generate request failed:", err)
      setCharacters([])
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate characters. Please try again.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <NpcGenerator
        genre={genre}
        archetype={archetype}
        count={count}
        options={options}
        isLoading={isLoading}
        onGenreChange={handleGenreChange}
        onArchetypeChange={setArchetype}
        onCountChange={setCount}
        onOptionsChange={setOptions}
        onGenerate={handleGenerate}
      />

      <section aria-label="Generated characters">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          {!isLoading && characters.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {characters.length}{" "}
              {characters.length === 1 ? "character" : "characters"}
            </p>
          )}
        </div>

        {error && !isLoading ? (
          <div
            role="alert"
            className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/40 bg-destructive/5 px-6 py-16 text-center"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="size-6" aria-hidden="true" />
            </div>
            <p className="text-sm font-medium text-destructive">{error}</p>
          </div>
        ) : isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
              <CharacterCardSkeleton key={i} />
            ))}
          </div>
        ) : hasGenerated && characters.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                isFavorite={favorites.has(character.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <Users className="size-6" aria-hidden="true" />
            </div>
            <p className="text-sm text-muted-foreground">
              No characters generated yet.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
