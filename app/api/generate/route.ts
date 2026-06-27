import type {
  Archetype,
  Genre,
  GeneratorOptions,
} from "@/lib/npc-types"
import { generateProceduralCharacters } from "@/lib/procedural-npc-generator"

export const maxDuration = 60

interface GenerateBody {
  genre: Genre
  archetype: Archetype
  count: number
  options: GeneratorOptions
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as GenerateBody
    const { genre, archetype, count, options } = body

    const characters = generateProceduralCharacters({
      genre,
      archetype,
      count,
      options,
    })

    return Response.json({ characters })
  } catch (error) {
    console.error("[v0] generate error:", error)
    return Response.json(
      {
        error: "Failed to generate characters. Please try again.",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
