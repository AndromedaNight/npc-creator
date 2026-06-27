"use client"

import { useState } from "react"
import {
  CalendarClock,
  Check,
  Copy,
  Download,
  Heart,
  Quote,
  ScrollText,
  Target,
  TriangleAlert,
  Users,
} from "lucide-react"

import type { Character } from "@/lib/npc-types"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

interface CharacterCardProps {
  character: Character
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}

function Section({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className="mt-1 text-sm leading-relaxed text-foreground">
          {children}
        </div>
      </div>
    </div>
  )
}

export function CharacterCard({
  character,
  isFavorite,
  onToggleFavorite,
}: CharacterCardProps) {
  const [copied, setCopied] = useState(false)

  function toPlainText(): string {
    const lines = [
      `Name: ${character.name}`,
      `Age: ${character.age}`,
      `Occupation: ${character.occupation}`,
      `Personality: ${character.personalityTraits.join(", ")}`,
      `Likes: ${character.likes.join(", ")}`,
      `Dislikes: ${character.dislikes.join(", ")}`,
      `Goal: ${character.goal}`,
      `Fear: ${character.fear}`,
    ]
    if (character.backstory) lines.push(`Backstory: ${character.backstory}`)
    if (character.dailyRoutine)
      lines.push(`Daily Routine: ${character.dailyRoutine}`)
    if (character.relationships?.length)
      lines.push(
        `Relationships: ${character.relationships
          .map((r) => `${r.name} (${r.relation})`)
          .join(", ")}`,
      )
    if (character.dialogueStyle)
      lines.push(`Dialogue Style: ${character.dialogueStyle}`)
    return lines.join("\n")
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(toPlainText())
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable
    }
  }

  function handleExportJson() {
    const blob = new Blob([JSON.stringify(character, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = `${character.name.toLowerCase().replace(/\s+/g, "-")}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-balance text-foreground">
              {character.name}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {character.age} &middot; {character.occupation}
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {character.archetype}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap gap-1.5">
          {character.personalityTraits.map((trait) => (
            <Badge key={trait} variant="outline" className="capitalize">
              {trait}
            </Badge>
          ))}
        </div>

        <Section icon={Heart} label="Likes">
          {character.likes.join(", ")}
        </Section>
        <Section icon={TriangleAlert} label="Dislikes">
          {character.dislikes.join(", ")}
        </Section>
        <Section icon={Target} label="Goal">
          {character.goal}
        </Section>
        <Section icon={TriangleAlert} label="Fear">
          {character.fear}
        </Section>

        {character.backstory && (
          <Section icon={ScrollText} label="Backstory">
            {character.backstory}
          </Section>
        )}
        {character.dailyRoutine && (
          <Section icon={CalendarClock} label="Daily Routine">
            {character.dailyRoutine}
          </Section>
        )}
        {character.relationships?.length ? (
          <Section icon={Users} label="Relationships">
            <ul className="space-y-0.5">
              {character.relationships.map((rel) => (
                <li key={`${rel.name}-${rel.relation}`}>
                  <span className="font-medium">{rel.name}</span>{" "}
                  <span className="text-muted-foreground">— {rel.relation}</span>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}
        {character.dialogueStyle && (
          <Section icon={Quote} label="Dialogue Style">
            {character.dialogueStyle}
          </Section>
        )}
      </CardContent>

      <CardFooter className="gap-2 border-t pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex-1"
        >
          {copied ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button
          variant={isFavorite ? "default" : "outline"}
          size="sm"
          onClick={() => onToggleFavorite(character.id)}
          aria-pressed={isFavorite}
          className="flex-1"
        >
          <Heart
            className={cn("size-4", isFavorite && "fill-current")}
            aria-hidden="true"
          />
          {isFavorite ? "Favorited" : "Favorite"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportJson}
          className="flex-1"
        >
          <Download className="size-4" aria-hidden="true" />
          Export JSON
        </Button>
      </CardFooter>
    </Card>
  )
}
