"use client"

import { Loader2, Sparkles } from "lucide-react"

import {
  ARCHETYPES_BY_GENRE,
  CHARACTER_COUNTS,
  GENRES,
  type Archetype,
  type CharacterCount,
  type Genre,
  type GeneratorOptions,
} from "@/lib/npc-types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface NpcGeneratorProps {
  genre: Genre
  archetype: Archetype
  count: CharacterCount
  options: GeneratorOptions
  isLoading: boolean
  onGenreChange: (value: Genre) => void
  onArchetypeChange: (value: Archetype) => void
  onCountChange: (value: CharacterCount) => void
  onOptionsChange: (options: GeneratorOptions) => void
  onGenerate: () => void
}

const OPTION_FIELDS: { key: keyof GeneratorOptions; label: string }[] = [
  { key: "includeBackstory", label: "Include Backstory" },
  { key: "includeDailyRoutine", label: "Include Daily Routine" },
  { key: "includeRelationships", label: "Include Relationships" },
  { key: "includeDialogueStyle", label: "Include Dialogue Style" },
]

export function NpcGenerator({
  genre,
  archetype,
  count,
  options,
  isLoading,
  onGenreChange,
  onArchetypeChange,
  onCountChange,
  onOptionsChange,
  onGenerate,
}: NpcGeneratorProps) {
  const availableArchetypes = ARCHETYPES_BY_GENRE[genre]

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-foreground">
          Character Generator
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose a setting and archetype, pick the details you want, and
          generate your cast.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="genre">Genre</Label>
            <Select
              value={genre}
              onValueChange={(value) => onGenreChange(value as Genre)}
            >
              <SelectTrigger id="genre" className="w-full">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {GENRES.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="archetype">Archetype</Label>
            <Select
              value={archetype}
              onValueChange={(value) => onArchetypeChange(value as Archetype)}
            >
              <SelectTrigger id="archetype" className="w-full">
                <SelectValue placeholder="Select archetype" />
              </SelectTrigger>
              <SelectContent>
                {availableArchetypes.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="count">Character Count</Label>
            <Select
              value={String(count)}
              onValueChange={(value) =>
                onCountChange(Number(value) as CharacterCount)
              }
            >
              <SelectTrigger id="count" className="w-full">
                <SelectValue placeholder="How many?" />
              </SelectTrigger>
              <SelectContent>
                {CHARACTER_COUNTS.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option} {option === 1 ? "character" : "characters"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-medium text-foreground">
            Details to include
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {OPTION_FIELDS.map((field) => (
              <label
                key={field.key}
                htmlFor={field.key}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2.5 transition-colors hover:bg-secondary"
              >
                <Checkbox
                  id={field.key}
                  checked={options[field.key]}
                  onCheckedChange={(checked) =>
                    onOptionsChange({
                      ...options,
                      [field.key]: checked === true,
                    })
                  }
                />
                <span className="text-sm text-foreground">{field.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <Button
          size="lg"
          className="w-full"
          onClick={onGenerate}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="size-4" aria-hidden="true" />
              Generate Characters
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
