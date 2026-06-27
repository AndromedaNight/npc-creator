import type {
  Archetype,
  Genre,
  GeneratorOptions,
} from "@/lib/npc-types"

export interface ProceduralCharacter {
  name: string
  age: number
  occupation: string
  traits: string[]
  likes: string[]
  dislikes: string[]
  goal: string
  fear: string
  backstory?: string
  dailyRoutine?: string
  relationships?: { name: string; relation: string }[]
  dialogueStyle?: string
  species: string
  culturalBackground: string
}

interface GenerateParams {
  genre: Genre
  archetype: Archetype
  count: number
  options: GeneratorOptions
}

type CultureKey =
  | "Japanese"
  | "Irish"
  | "Yoruba"
  | "Chinese"
  | "French"
  | "Norse"
  | "Indian"
  | "Arabic"
  | "Mexican"
  | "Nigerian"

interface CultureData {
  firstNames: string[]
  lastNames: string[]
  firstFragments: string[]
  lastFragments: string[]
}

const CULTURE_DATA: Record<CultureKey, CultureData> = {
  Japanese: {
    firstNames: [
      "Aiko",
      "Akira",
      "Asami",
      "Aya",
      "Daichi",
      "Emi",
      "Haru",
      "Hina",
      "Kai",
      "Kaede",
      "Kaito",
      "Keiko",
      "Mai",
      "Mika",
      "Nana",
      "Ren",
      "Rin",
      "Sora",
      "Yui",
      "Yuto",
    ],
    lastNames: [
      "Sato",
      "Suzuki",
      "Takahashi",
      "Tanaka",
      "Watanabe",
      "Ito",
      "Yamamoto",
      "Nakamura",
      "Kobayashi",
      "Sasaki",
      "Yamada",
      "Matsumoto",
      "Inoue",
      "Kimura",
      "Shimizu",
      "Hayashi",
      "Mori",
      "Abe",
      "Ikeda",
      "Kaneko",
    ],
    firstFragments: ["Aki", "Haru", "Yui", "Ren", "Mai", "Sora", "Noa", "Mika", "Kyo", "Rin"],
    lastFragments: ["Taro", "Mori", "Kawa", "Hana", "Kuma", "Sumi", "Aki", "Hori", "Nori", "Mina"],
  },
  Irish: {
    firstNames: [
      "Aine",
      "Aoife",
      "Brendan",
      "Caoimhe",
      "Conor",
      "Eamon",
      "Fionn",
      "Iseult",
      "Keira",
      "Laoise",
      "Maeve",
      "Mairead",
      "Niall",
      "Orla",
      "Ronan",
      "Saoirse",
      "Sean",
      "Siobhan",
      "Tara",
      "Tiernan",
    ],
    lastNames: [
      "O'Brien",
      "O'Connor",
      "O'Donnell",
      "O'Flaherty",
      "O'Neill",
      "Murphy",
      "Kelly",
      "Byrne",
      "Doyle",
      "Walsh",
      "Ryan",
      "Murray",
      "Gallagher",
      "Sullivan",
      "Kavanagh",
      "Lynch",
      "Quinn",
      "Doherty",
      "Fitzgerald",
      "Moran",
    ],
    firstFragments: ["Ais", "Bran", "Cao", "Finn", "Mae", "Rois", "Sio", "Tara", "Niall", "Orla"],
    lastFragments: ["Dun", "Moor", "Kane", "Rory", "Cairn", "Aine", "Shea", "Rian", "Glen", "Dara"],
  },
  Yoruba: {
    firstNames: [
      "Adaeze",
      "Adebayo",
      "Akin",
      "Ayo",
      "Bolanle",
      "Chiamaka",
      "Dayo",
      "Emeka",
      "Funmi",
      "Ife",
      "Kemi",
      "Lola",
      "Mojisola",
      "Nneka",
      "Olufemi",
      "Oluwaseun",
      "Sade",
      "Tomi",
      "Yemi",
      "Zainab",
    ],
    lastNames: [
      "Adebiyi",
      "Adewale",
      "Akinola",
      "Balogun",
      "Bello",
      "Durojaiye",
      "Fakoya",
      "Ige",
      "Obafemi",
      "Ogunleye",
      "Okafor",
      "Olajide",
      "Onikoyi",
      "Oyelade",
      "Sanni",
      "Shodeinde",
      "Tijani",
      "Wahab",
      "Yusuf",
      "Zubair",
    ],
    firstFragments: ["Ada", "Ayo", "Bola", "Dayo", "Femi", "Ife", "Kemi", "Lola", "Moyo", "Tobi"],
    lastFragments: ["Aja", "Bami", "Dare", "Fola", "Ife", "Kemi", "Ola", "Tade", "Yemi", "Sola"],
  },
  Chinese: {
    firstNames: [
      "Anqi",
      "Bing",
      "Chen",
      "Cheng",
      "Dawei",
      "Fang",
      "Hao",
      "Jia",
      "Jing",
      "Lan",
      "Li",
      "Mei",
      "Ming",
      "Ning",
      "Qiang",
      "Qin",
      "Rui",
      "Shan",
      "Wei",
      "Xia",
    ],
    lastNames: [
      "Li",
      "Wang",
      "Zhang",
      "Liu",
      "Chen",
      "Yang",
      "Huang",
      "Zhao",
      "Wu",
      "Zhou",
      "Xu",
      "Sun",
      "Ma",
      "Zhu",
      "Hu",
      "Guo",
      "He",
      "Gao",
      "Lin",
      "Luo",
    ],
    firstFragments: ["An", "Bei", "Fen", "Jin", "Lin", "Mei", "Qiao", "Rui", "Shan", "Xiao"],
    lastFragments: ["Jun", "Wei", "Xiang", "Hao", "Min", "Ping", "Yuan", "Feng", "Lei", "Tao"],
  },
  French: {
    firstNames: [
      "Amelie",
      "Antoine",
      "Camille",
      "Celine",
      "Claire",
      "Elise",
      "Etienne",
      "Gabriel",
      "Julien",
      "Luc",
      "Manon",
      "Margot",
      "Mathilde",
      "Nicolas",
      "Odette",
      "Pierre",
      "Remi",
      "Sophie",
      "Victor",
      "Yvette",
    ],
    lastNames: [
      "Martin",
      "Bernard",
      "Dubois",
      "Thomas",
      "Robert",
      "Richard",
      "Petit",
      "Durand",
      "Leroy",
      "Moreau",
      "Simon",
      "Laurent",
      "Lefebvre",
      "Michel",
      "Garcia",
      "David",
      "Bertrand",
      "Roux",
      "Vincent",
      "Fournier",
    ],
    firstFragments: ["Ari", "Cam", "Elie", "Gabe", "Jules", "Lau", "Mare", "Nico", "Rene", "Sophie"],
    lastFragments: ["Belle", "Lac", "Roche", "Vall", "Blanc", "More", "Dart", "Lune", "Noir", "Soleil"],
  },
  Norse: {
    firstNames: [
      "Alda",
      "Astrid",
      "Bjorn",
      "Eira",
      "Freya",
      "Gunnar",
      "Haldora",
      "Heidi",
      "Ingrid",
      "Jorunn",
      "Kari",
      "Loki",
      "Ragna",
      "Sif",
      "Skarphedin",
      "Thora",
      "Tyr",
      "Ulf",
      "Vega",
      "Ylva",
    ],
    lastNames: [
      "Einarsson",
      "Haraldsson",
      "Bjornsson",
      "Sigurdsson",
      "Thorsen",
      "Asgeirsson",
      "Freysdottir",
      "Gunnarsdottir",
      "Ragnarsson",
      "Eldjarn",
      "Stormborn",
      "Hrafnsson",
      "Frostson",
      "Skjoldsson",
      "Alderson",
      "Bergsson",
      "Bransson",
      "Rydberg",
      "Skarsson",
      "Vargsson",
    ],
    firstFragments: ["Ald", "Bjorn", "Eir", "Frey", "Gunn", "Hraf", "Inga", "Ragn", "Sif", "Thor"],
    lastFragments: ["fjord", "storm", "raven", "ash", "oak", "gale", "ice", "rock", "fen", "briar"],
  },
  Indian: {
    firstNames: [
      "Aarav",
      "Ananya",
      "Arjun",
      "Diya",
      "Isha",
      "Kavya",
      "Meera",
      "Naina",
      "Neha",
      "Prakash",
      "Riya",
      "Sanjay",
      "Shreya",
      "Siddharth",
      "Tara",
      "Vikram",
      "Yash",
      "Zara",
      "Nisha",
      "Rohan",
    ],
    lastNames: [
      "Patel",
      "Sharma",
      "Gupta",
      "Singh",
      "Kapoor",
      "Chopra",
      "Iyer",
      "Reddy",
      "Desai",
      "Joshi",
      "Malhotra",
      "Nair",
      "Menon",
      "Bhatia",
      "Saxena",
      "Thakur",
      "Varma",
      "Khanna",
      "Agarwal",
      "Banerjee",
    ],
    firstFragments: ["Aar", "Ani", "Arj", "Di", "Ish", "Kav", "Meer", "Nai", "Riya", "Ved"],
    lastFragments: ["Pal", "Sharm", "Gupt", "Singh", "Kapoor", "Dhar", "Rao", "Nair", "Jain", "Mohan"],
  },
  Arabic: {
    firstNames: [
      "Amina",
      "Amir",
      "Dalia",
      "Farah",
      "Hadi",
      "Hana",
      "Khalid",
      "Layla",
      "Malak",
      "Nadia",
      "Nour",
      "Omar",
      "Rahim",
      "Rania",
      "Samir",
      "Sara",
      "Tariq",
      "Yara",
      "Zahra",
      "Zaid",
    ],
    lastNames: [
      "Al-Sayed",
      "Hassan",
      "Karim",
      "Rahman",
      "Mansoor",
      "El-Tayeb",
      "Nasser",
      "Ibrahim",
      "Badr",
      "Fawzi",
      "Qureshi",
      "Abdullah",
      "Farouk",
      "Hakim",
      "Jabri",
      "Mourad",
      "Salem",
      "Yacoub",
      "Zaki",
      "Khalaf",
    ],
    firstFragments: ["Ami", "Dali", "Far", "Hadi", "Hana", "Khal", "Lay", "Nour", "Rami", "Zah"],
    lastFragments: ["al", "bari", "hadi", "farid", "nour", "sami", "karim", "hassan", "qadir", "zain"],
  },
  Mexican: {
    firstNames: [
      "Alejandra",
      "Amelia",
      "Carlos",
      "Carmen",
      "Diego",
      "Elena",
      "Fernanda",
      "Guadalupe",
      "Isabella",
      "Javier",
      "Jose",
      "Lucia",
      "Mateo",
      "Mireya",
      "Nadia",
      "Paola",
      "Rafael",
      "Sofia",
      "Valentina",
      "Ximena",
    ],
    lastNames: [
      "Garcia",
      "Rodriguez",
      "Martinez",
      "Lopez",
      "Perez",
      "Gonzalez",
      "Sanchez",
      "Ramirez",
      "Torres",
      "Flores",
      "Rivera",
      "Morales",
      "Vega",
      "Castillo",
      "Ruiz",
      "Reyes",
      "Ortiz",
      "Mendoza",
      "Herrera",
      "Cruz",
    ],
    firstFragments: ["Ale", "Carm", "Die", "El", "Fera", "Guada", "Javi", "Luci", "Mate", "Vale"],
    lastFragments: ["Mora", "Rios", "Luna", "Vega", "Cruz", "Silva", "Nava", "Arias", "Paz", "Rojas"],
  },
  Nigerian: {
    firstNames: [
      "Amara",
      "Bisi",
      "Chinedu",
      "Damilola",
      "Efe",
      "Folasade",
      "Habib",
      "Ifeoma",
      "Jumoke",
      "Kelechi",
      "Maya",
      "Ngozi",
      "Obi",
      "Olu",
      "Rasheed",
      "Simi",
      "Tosin",
      "Uchenna",
      "Yinka",
      "Zainab",
    ],
    lastNames: [
      "Akinyemi",
      "Okafor",
      "Edozie",
      "Ibrahim",
      "Okafor",
      "Balogun",
      "Adebayo",
      "Nwosu",
      "Eze",
      "Onyeka",
      "Folarin",
      "Bello",
      "Agu",
      "Ojo",
      "Suleiman",
      "Ademola",
      "Chukwu",
      "Tijani",
      "Musa",
      "Adewale",
    ],
    firstFragments: ["Ama", "Bisi", "Chi", "Dami", "Efe", "Fola", "Kele", "Maya", "Tosin", "Yinka"],
    lastFragments: ["Agu", "Edo", "Ndu", "Ojo", "Sani", "Tomi", "Uche", "Yemi", "Bola", "Kemi"],
  },
}

const MODERN_JOBS = [
  "teacher",
  "baker",
  "barista",
  "nurse",
  "librarian",
  "park ranger",
  "chef",
  "mechanic",
  "driver",
  "journalist",
  "pharmacist",
  "florist",
  "postal worker",
  "electrician",
  "plumber",
  "custodian",
  "firefighter",
  "paramedic",
  "gardener",
  "receptionist",
  "hairdresser",
  "makeup artist",
  "architect",
  "real estate agent",
  "insurance adjuster",
  "social worker",
  "travel agent",
  "event planner",
  "museum guide",
  "interpreter",
  "fitness instructor",
  "personal trainer",
  "dog walker",
  "pet groomer",
  "shopkeeper",
  "bank teller",
  "loan officer",
  "human resources coordinator",
  "sales associate",
  "warehouse supervisor",
  "delivery driver",
  "tour guide",
  "caterer",
  "graphic designer",
  "copywriter",
  "photographer",
  "videographer",
  "audio technician",
  "stage manager",
  "music teacher",
  "dance instructor",
  "speech therapist",
  "occupational therapist",
  "childcare worker",
  "community organizer",
  "nutritionist",
  "dietitian",
  "retail manager",
  "restaurant host",
  "bartender",
  "sommelier",
  "carpenter",
  "painter",
  "welder",
  "landscaper",
  "furniture restorer",
  "jewelry maker",
  "potter",
  "tailor",
  "seamstress",
  "crossing guard",
  "bus driver",
  "substitute teacher",
  "safety inspector",
  "public librarian",
  "museum curator",
  "deputy marshal",
  "night shift supervisor",
  "farmhand",
  "veterinary assistant",
  "animal shelter coordinator",
  "life guard",
  "ski instructor",
  "groundskeeper",
  "conservation officer",
  "marine biologist",
  "forestry technician",
  "waste management specialist",
  "water quality analyst",
  "food critic",
  "wine steward",
  "city planner",
  "court clerk",
  "paralegal",
  "claims investigator",
  "security guard",
  "private investigator",
  "glazier",
  "appliance repair technician",
  "home stager",
  "beachcomber",
  "bookbinder",
  "antique dealer",
  "mural painter",
  "coffee roaster",
  "brew master",
  "bakery manager",
  "dressmaker",
  "marina attendant",
  "ferry operator",
  "commercial diver",
  "historian",
  "genealogist",
  "corn farmer",
  "orchard keeper",
  "fruit picker",
  "market vendor",
  "street musician",
  "toy maker",
  "clockmaker",
  "repairman",
  "sailmaker",
]

const FANTASY_JOBS = [
  "alchemist",
  "ranger",
  "bard",
  "apothecary",
  "blacksmith",
  "cartographer",
  "enchanted brewer",
  "innkeeper",
  "mage",
  "oracle",
  "paladin",
  "spellsmith",
  "tinker",
  "herbalist",
  "fortune teller",
  "runecaster",
  "scribe",
  "monster trapper",
  "grave keeper",
  "warder",
  "diviner",
  "treasure hunter",
  "mystic",
  "harbormaster",
  "stablehand",
  "falconer",
  "beekeeper",
  "fletcher",
  "shipwright",
  "bone carver",
  "glassblower",
  "wisp collector",
  "druid",
  "shaman",
  "veteran swordsman",
  "dragon handler",
  "soul broker",
  "mask maker",
  "clockmaker",
  "tavern keeper",
  "battle healer",
  "pathfinder",
  "bounty hunter",
  "court astrologer",
  "forest warden",
  "river guide",
  "lighthouse keeper",
  "grave digger",
  "moon priest",
  "sun priest",
  "wandmaker",
  "scroll keeper",
  "crown archivist",
  "goblin broker",
  "sky pilot",
  "fey broker",
  "golem smith",
  "candle maker",
  "tarot reader",
  "spear smith",
  "warlock",
  "healer",
  "temple caretaker",
  "lantern keeper",
  "mire guide",
  "harbor witch",
  "copper smith",
  "potion seller",
  "ironmonger",
  "crown messenger",
  "mapmaker",
]

const SPECIES_BY_GENRE: Record<Genre, string[]> = {
  "Modern Life Sim": [
    "Human",
    "Human",
    "Human",
    "Human",
    "Human + Fairy",
    "Human + Elf",
    "Catfolk",
    "Wolfkin",
    "Foxfolk",
    "Human + Vampire",
  ],
  Fantasy: [
    "Human",
    "Human",
    "Human",
    "Elf",
    "Dwarf",
    "Orc",
    "Fairy",
    "Angel",
    "Werewolf",
    "Vampire",
    "Dryad",
    "Nymph",
    "Kitsune",
    "Elemental",
    "Human + Fairy",
    "Elf + Dryad",
    "Werewolf + Vampire",
    "Dwarf + Elemental",
    "Fairy + Human",
    "Nymph + Dryad",
  ],
  "Sci-Fi": [
    "Human",
    "Human",
    "Human",
    "Human",
    "Human + Elf",
    "Human + Fairy",
    "Catfolk",
    "Wolfkin",
    "Elemental",
    "Dwarf",
    "Elf",
  ],
}

const ARCHETYPE_TRAITS: Record<Archetype, string[]> = {
  Student: ["curious", "restless", "eager"],
  Shopkeeper: ["practical", "gregarious", "observant"],
  "Office Worker": ["organized", "reserved", "dependable"],
  Artist: ["imaginative", "sensitive", "spirited"],
  Adventurer: ["bold", "independent", "resourceful"],
  Merchant: ["shrewd", "charming", "competitive"],
  Noble: ["composed", "eloquent", "disciplined"],
  Farmer: ["steady", "patient", "grounded"],
}

const ARCHETYPE_GOALS: Record<Archetype, string[]> = {
  Student: ["finish a difficult apprenticeship", "learn a hidden craft", "navigate a new city"],
  Shopkeeper: ["keep the business thriving", "expand the storefront", "earn a loyal customer base"],
  "Office Worker": ["secure a long-awaited promotion", "create a better routine", "protect a fragile work-life balance"],
  Artist: ["finish a masterpiece", "find a patron", "build a new audience"],
  Adventurer: ["discover a lost relic", "clear a dangerous ruin", "find a missing companion"],
  Merchant: ["close a lucrative contract", "outmaneuver a rival trader", "bring a rare good home"],
  Noble: ["preserve a family legacy", "forge an alliance", "win a contested election"],
  Farmer: ["save the harvest", "buy better land", "protect the village fields"],
}

const ARCHETYPE_FEARS: Record<Archetype, string[]> = {
  Student: ["being left behind", "failing an important exam", "being misunderstood"],
  Shopkeeper: ["bankruptcy", "losing a favorite customer", "being cheated"],
  "Office Worker": ["bureaucratic collapse", "public embarrassment", "being replaced"],
  Artist: ["creative block", "indifference", "being forgotten"],
  Adventurer: ["settling into a dull life", "failing the group", "a ruined reputation"],
  Merchant: ["ruin from a bad deal", "competition", "being seen as foolish"],
  Noble: ["scandal", "losing lineage", "civil unrest"],
  Farmer: ["drought", "bad weather", "crop blight"],
}

function weightedPick<T>(values: T[], weights?: number[]): T {
  if (!values.length) {
    throw new Error("No values available")
  }

  if (!weights) {
    return values[Math.floor(Math.random() * values.length)]
  }

  const total = weights.reduce((sum, value) => sum + value, 0)
  let threshold = Math.random() * total

  for (let index = 0; index < values.length; index += 1) {
    threshold -= weights[index]
    if (threshold <= 0) {
      return values[index]
    }
  }

  return values[values.length - 1]
}

function buildNamePool(data: CultureData, kind: "first" | "last", size = 200): string[] {
  const pool = new Set<string>()
  const baseNames = kind === "first" ? data.firstNames : data.lastNames
  const fragments = kind === "first" ? data.firstFragments : data.lastFragments

  for (const name of baseNames) {
    pool.add(name)
  }

  for (const base of baseNames) {
    for (const fragment of fragments) {
      const candidate = `${base}${fragment}`
      pool.add(candidate)
      if (pool.size >= size) {
        return Array.from(pool)
      }
    }
  }

  while (pool.size < size) {
    const base = baseNames[Math.floor(Math.random() * baseNames.length)]
    const fragment = fragments[Math.floor(Math.random() * fragments.length)]
    pool.add(`${base}${fragment}`)
  }

  return Array.from(pool)
}

function generateName(
  culture: CultureKey,
  usedNames: Set<string>,
): string {
  const data = CULTURE_DATA[culture]
  const firstPool = buildNamePool(data, "first", 220)
  const lastPool = buildNamePool(data, "last", 220)

  for (let attempt = 0; attempt < 250; attempt += 1) {
    const first = weightedPick(firstPool, Array(firstPool.length).fill(1))
    const last = weightedPick(lastPool, Array(lastPool.length).fill(1))
    const candidate = `${first} ${last}`
    if (!usedNames.has(candidate)) {
      usedNames.add(candidate)
      return candidate
    }
  }

  const fallback = `${data.firstNames[0]} ${data.lastNames[0]}`
  usedNames.add(fallback)
  return fallback
}

function pickOccupation(genre: Genre, usedOccupations: Set<string>): string {
  const jobPool = genre === "Fantasy" ? FANTASY_JOBS : MODERN_JOBS
  const weighted = jobPool.flatMap((job) => {
    const isCommon = ["teacher", "baker", "nurse", "chef", "mechanic", "shopkeeper", "gardener", "driver", "artist", "ranger", "mage", "blacksmith"].includes(job)
    return Array(isCommon ? 4 : 1).fill(job)
  })

  for (let attempt = 0; attempt < 250; attempt += 1) {
    const candidate = weightedPick(weighted)
    if (!usedOccupations.has(candidate)) {
      usedOccupations.add(candidate)
      return candidate
    }
  }

  const fallback = weightedPick(jobPool)
  usedOccupations.add(fallback)
  return fallback
}

function pickSpecies(genre: Genre, usedSpecies: Set<string>): string {
  const options = SPECIES_BY_GENRE[genre]

  for (let attempt = 0; attempt < 250; attempt += 1) {
    const candidate = weightedPick(options)
    if (!usedSpecies.has(candidate)) {
      usedSpecies.add(candidate)
      return candidate
    }
  }

  const fallback = options[0]
  usedSpecies.add(fallback)
  return fallback
}

function pickCulture(genre: Genre): CultureKey {
  const options: CultureKey[] = [
    "Japanese",
    "Irish",
    "Yoruba",
    "Chinese",
    "French",
    "Norse",
    "Indian",
    "Arabic",
    "Mexican",
    "Nigerian",
  ]

  if (genre === "Fantasy") {
    return weightedPick(["Japanese", "Irish", "Yoruba", "Chinese", "French", "Norse"] as CultureKey[])
  }

  if (genre === "Sci-Fi") {
    return weightedPick(["Japanese", "Chinese", "Indian", "Arabic", "Mexican", "Nigerian"] as CultureKey[])
  }

  return weightedPick(options)
}

function pickTraits(archetype: Archetype, genre: Genre): string[] {
  const baseTraits = ARCHETYPE_TRAITS[archetype]
  const flavor: string[] = []
  if (genre === "Fantasy") {
    flavor.push("mysterious")
  }
  if (genre === "Sci-Fi") {
    flavor.push("precise")
  }
  return [...baseTraits, ...flavor].slice(0, 5)
}

function pickLikes(archetype: Archetype): string[] {
  const likesByArchetype: Record<Archetype, string[]> = {
    Student: ["music", "late-night study sessions", "small cafés"],
    Shopkeeper: ["conversation", "routine", "favorite snacks"],
    "Office Worker": ["quiet mornings", "organized notes", "good coffee"],
    Artist: ["street art", "old books", "live performances"],
    Adventurer: ["maps", "strange ruins", "fresh air"],
    Merchant: ["good bargains", "travel", "stories from distant ports"],
    Noble: ["ceremony", "fine details", "well-kept gardens"],
    Farmer: ["sunrise", "homegrown food", "steady work"],
  }

  return likesByArchetype[archetype].slice(0, 3)
}

function pickDislikes(archetype: Archetype): string[] {
  const dislikesByArchetype: Record<Archetype, string[]> = {
    Student: ["chaos", "being rushed", "empty promises"],
    Shopkeeper: ["dishonesty", "crowds at closing time", "bad service"],
    "Office Worker": ["disorganization", "unnecessary meetings", "wasted time"],
    Artist: ["formulaic work", "crowds", "harsh criticism"],
    Adventurer: ["being idle", "bureaucracy", "false bravado"],
    Merchant: ["loss", "bad timing", "underprepared rivals"],
    Noble: ["public scandal", "rudeness", "waste"],
    Farmer: ["sudden change", "neglect", "flooded fields"],
  }

  return dislikesByArchetype[archetype].slice(0, 3)
}

function buildBackstory(genre: Genre, archetype: Archetype, species: string): string {
  const root = `A ${species.toLowerCase()} ${archetype.toLowerCase()} from a ${genre.toLowerCase()} setting who learned to adapt quickly.`
  if (genre === "Fantasy") {
    return `${root} They have one strange bond with the local landscape and a rumor that follows their name.`
  }
  if (genre === "Sci-Fi") {
    return `${root} Their life has been shaped by a community that values resilience, memory, and improvisation.`
  }
  return `${root} They weave together work, community, and ambition in a way that makes them hard to forget.`
}

function buildDailyRoutine(archetype: Archetype, genre: Genre): string {
  if (genre === "Fantasy") {
    return `They start the day before dawn, tend their duties, and end the evening under the watch of ${archetype.toLowerCase()}-shaped obligations.`
  }
  return `Their day begins with small rituals, practical errands, and a steady effort to keep their life organized.`
}

function buildDialogStyle(genre: Genre): string {
  if (genre === "Fantasy") {
    return "Measured and poetic, with a habit of speaking in vivid metaphors."
  }
  if (genre === "Sci-Fi") {
    return "Direct and clipped, with quick observations that sound almost clinical."
  }
  return "Warm and conversational, with an easy laugh and practical turns of phrase."
}

function buildRelationships(archetype: Archetype, species: string) {
  return [
    { name: `${species} neighbor`, relation: "trusted ally" },
    { name: `${archetype} mentor`, relation: "guiding influence" },
    { name: "local shop owner", relation: "familiar rival" },
  ]
}

export function generateProceduralCharacters({
  genre,
  archetype,
  count,
  options,
}: GenerateParams): ProceduralCharacter[] {
  const characters: ProceduralCharacter[] = []
  const usedNames = new Set<string>()
  const usedOccupations = new Set<string>()
  const usedSpecies = new Set<string>()

  for (let index = 0; index < count; index += 1) {
    const culture = pickCulture(genre)
    const species = pickSpecies(genre, usedSpecies)
    const name = generateName(culture, usedNames)
    const occupation = pickOccupation(genre, usedOccupations)
    const age = genre === "Fantasy" ? 20 + Math.floor(Math.random() * 80) : 18 + Math.floor(Math.random() * 60)
    const traits = pickTraits(archetype, genre)
    const likes = pickLikes(archetype)
    const dislikes = pickDislikes(archetype)
    const goal = weightedPick(ARCHETYPE_GOALS[archetype])
    const fear = weightedPick(ARCHETYPE_FEARS[archetype])

    characters.push({
      name,
      age,
      occupation,
      traits,
      likes,
      dislikes,
      goal,
      fear,
      backstory: options.includeBackstory ? buildBackstory(genre, archetype, species) : undefined,
      dailyRoutine: options.includeDailyRoutine ? buildDailyRoutine(archetype, genre) : undefined,
      relationships: options.includeRelationships ? buildRelationships(archetype, species) : undefined,
      dialogueStyle: options.includeDialogueStyle ? buildDialogStyle(genre) : undefined,
      species,
      culturalBackground: culture,
    })
  }

  return characters
}
