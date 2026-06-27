import { Wand2 } from "lucide-react"

import { NpcCreator } from "@/components/npc-creator"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="mb-10 flex flex-col items-center text-center sm:items-start sm:text-left">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Wand2 className="size-5" aria-hidden="true" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              NPC Creator
            </h1>
          </div>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            Generate believable characters for games, stories, and tabletop
            adventures.
          </p>
        </header>

        <NpcCreator />
      </div>
    </main>
  )
}
