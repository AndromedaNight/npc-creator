import { GoogleGenAI, Type } from "@google/genai"
import { z } from "zod"

export const maxDuration = 60

const RelationshipSchema = z.object({
  name: z.string(),
  relation: z.string(),
})

const CharacterSchema = z.object({
  name: z.string(),
  age: z.union([z.string(), z.number()]),
  occupation: z.string(),
  traits: z.array(z.string()),
  likes: z.array(z.string()),
  dislikes: z.array(z.string()),
  goal: z.string(),
  fear: z.string(),
  backstory: z.string().nullable().optional(),
  dailyRoutine: z.string().nullable().optional(),
  relationships: z.array(RelationshipSchema).nullable().optional(),
  dialogueStyle: z.string().nullable().optional(),
})

const ResponseSchema = z.object({
  characters: z.array(CharacterSchema),
})

interface GenerateBody {
  genre: string
  archetype: string
  count: number
  options: {
    includeBackstory: boolean
    includeDailyRoutine: boolean
    includeRelationships: boolean
    includeDialogueStyle: boolean
  }
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return Response.json(
      {
        error:
          "GEMINI_API_KEY is not set. Add it to your project environment variables.",
      },
      { status: 500 },
    )
  }

  try {
    const body = (await req.json()) as GenerateBody
    const { genre, archetype, count, options } = body

    const requested: string[] = [
      "name",
      "age (a realistic age for the setting)",
      "occupation",
      "traits (3-5 short personality descriptors)",
      "likes (2-4 items)",
      "dislikes (2-4 items)",
      "goal",
      "fear",
    ]
    if (options.includeBackstory) requested.push("backstory (2-4 sentences)")
    if (options.includeDailyRoutine)
      requested.push("dailyRoutine (a short description of a typical day)")
    if (options.includeRelationships)
      requested.push("relationships (2-3 named people and their relation)")
    if (options.includeDialogueStyle)
      requested.push(
        "dialogueStyle (how they speak, with a short example line)",
      )

    const omit: string[] = []
    if (!options.includeBackstory) omit.push("backstory")
    if (!options.includeDailyRoutine) omit.push("dailyRoutine")
    if (!options.includeRelationships) omit.push("relationships")
    if (!options.includeDialogueStyle) omit.push("dialogueStyle")

    const ai = new GoogleGenAI({ apiKey })

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents:
        `Generate exactly ${count} distinct NPC${count === 1 ? "" : "s"} for a "${genre}" setting. ` +
        `Each character is based on the "${archetype}" archetype but should be interpreted in a fresh, specific way. ` +
        `For each character include these fields: ${requested.join(", ")}. ` +
        (omit.length
          ? `Leave these fields empty (empty string or empty array): ${omit.join(", ")}. `
          : ""),
      config: {
        systemInstruction:
          "You are an expert game writer and character designer. " +
          "Generate believable, grounded NPCs suitable for video games and storytelling. " +
          "Avoid stereotypes and generic descriptions. " +
          "Each character should feel like a real person with unique motivations, routines, and personality. " +
          "Vary names, ages, and backgrounds so no two characters feel interchangeable.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            characters: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  age: { type: Type.STRING },
                  occupation: { type: Type.STRING },
                  traits: { type: Type.ARRAY, items: { type: Type.STRING } },
                  likes: { type: Type.ARRAY, items: { type: Type.STRING } },
                  dislikes: { type: Type.ARRAY, items: { type: Type.STRING } },
                  goal: { type: Type.STRING },
                  fear: { type: Type.STRING },
                  backstory: { type: Type.STRING },
                  dailyRoutine: { type: Type.STRING },
                  relationships: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        relation: { type: Type.STRING },
                      },
                      required: ["name", "relation"],
                    },
                  },
                  dialogueStyle: { type: Type.STRING },
                },
                required: [
                  "name",
                  "age",
                  "occupation",
                  "traits",
                  "likes",
                  "dislikes",
                  "goal",
                  "fear",
                ],
              },
            },
          },
          required: ["characters"],
        },
      },
    })

    const text = response.text
    if (!text) {
      throw new Error("Empty response from Gemini.")
    }

    const parsed = ResponseSchema.parse(JSON.parse(text))

    return Response.json(parsed)
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
