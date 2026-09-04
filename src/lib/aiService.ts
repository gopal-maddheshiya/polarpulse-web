// AI service — isolated, ready to be wired to a real API later.
// Deterministic mock that produces input-aware, audience-aware drafts.

export type Audience = 'Student' | 'Teacher' | 'Researcher' | 'General Public'

export interface AIDraft {
  simpleExplanation: string
  websiteArticle: string
  socialPost: string
  instagramCaption: string
  videoScript: string
}

const STOPWORDS = new Set([
  'the','a','an','of','in','on','and','or','to','for','with','from','by','is','are','was','were','be','been','being','this','that','these','those','it','its','as','at','we','our','their','there','which','while','than','then','so','such','also','into','over','between','both','each','more','most','some','any','no','not','only','same','very','can','may','will','would','should','could','using','used','use','study','studies','based','show','shows','showed','observed','found','result','results','data','sample','samples','analysis','paper','research','report','abstract','introduction','method','methods'
])

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.has(w))
}

function titleCase(s: string) {
  return s.replace(/\b\w/g, c => c.toUpperCase())
}

function topKeywords(input: string, n = 5): string[] {
  const counts: Record<string, number> = {}
  for (const t of tokenize(input)) counts[t] = (counts[t] ?? 0) + 1
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([w]) => w)
}

function findNumbers(input: string): string[] {
  const m = input.match(/-?\d+(?:\.\d+)?\s*(?:°[CF]|%|km|m|s|min|h|hours?|days?|years?|Ma|ka|m\/s|m\/s²|µatm|ppm|ppb|ng\/m³|µg\/m³|w\.e\.|m w\.e\.)?/gi)
  return m ? m.slice(0, 4).map(s => s.trim()) : []
}

function hasAny(input: string, words: string[]): boolean {
  const t = ' ' + input.toLowerCase() + ' '
  return words.some(w => t.includes(' ' + w + ' ') || t.includes(w))
}

function summarize(input: string, words = 28): string {
  const cleaned = input.replace(/\s+/g, ' ').trim()
  const w = cleaned.split(' ')
  if (w.length <= words) return cleaned
  return w.slice(0, words).join(' ') + '…'
}

const TONE: Record<Audience, string> = {
  Student: 'engaging, uses examples, defines jargon, curious tone, 8th–10th grade reading level',
  Teacher: 'structured, with talking points, classroom activities, vocabulary list',
  Researcher: 'precise, technical, references methods and datasets, professional tone',
  'General Public': 'warm, narrative, metaphor-driven, accessible to non-experts',
}

const TONE_VERB: Record<Audience, [string, string]> = {
  Student: ['let\u2019s', 'notice'],
  Teacher: ['students can', 'we can'],
  Researcher: ['we', 'the dataset'],
  'General Public': ['you might', 'imagine'],
}

function buildSimpleExplanation(input: string, audience: Audience): string {
  const kw = topKeywords(input, 4)
  const focus = (kw[0] ? titleCase(kw[0]) : 'This topic')
  const nums = findNumbers(input)
  const tone = TONE[audience]
  const [_, hookVerb] = TONE_VERB[audience]
  const sentence2 = nums.length > 0
    ? `Key numbers from the source: ${nums.join(', ')}.`
    : `Here are the key things ${hookVerb} in the original text.`

  const lines = [
    `${focus} — in plain language.`,
    '',
    sentence2,
    '',
    `The big idea is this:`,
  ]
  if (kw[0]) lines.push(`• ${titleCase(kw[0])} is one of the most important words in the source — let\u2019s start there.`)
  if (kw[1]) lines.push(`• ${titleCase(kw[1])} shapes how the result is measured.`)
  if (kw[2]) lines.push(`• ${titleCase(kw[2])} is the part that connects the work to a bigger question.`)
  if (kw[3]) lines.push(`• ${titleCase(kw[3])} is often where the next research question lives.`)

  lines.push('')
  lines.push(`Why does this matter? It is a small piece of a much larger system. The polar regions, the ocean and the atmosphere are deeply connected — and studies like this one change how we read the signals.`)
  lines.push('')
  lines.push(`(Tone: ${tone}. AI-assisted draft — verify scientific accuracy before publication.)`)
  return lines.join('\n')
}

function buildWebsiteArticle(input: string, audience: Audience): string {
  const kw = topKeywords(input, 5)
  const headline = kw[0] ? titleCase(kw[0]) : 'New research from the polar programme'
  const sub = kw[1] ? `${titleCase(kw[1])} in focus` : 'A short read for non-specialists'
  const summary = summarize(input, 60)
  const tone = TONE[audience]

  return [
    `# ${headline}`,
    `*${sub}*`,
    '',
    `## What the work says`,
    '',
    summary,
    '',
    `## Why it matters for India`,
    '',
    `Polar science is not a curiosity — it is a foundation. Ice sheets, sea ice, ocean circulation and polar atmospheres are deeply connected to the Indian monsoon, the Himalayan cryosphere and the long-term sea-level budget. Investment in polar research is investment in climate resilience.`,
    '',
    `## The science, briefly`,
    '',
    kw.length > 0
      ? `Three concepts carry the argument: **${kw.slice(0, 3).map(titleCase).join('**, **') || 'observation'}**.`
      : `The argument rests on a careful chain of observations.`,
    '',
    `## What\u2019s next`,
    '',
    `Continued observations — and openly available data — make this kind of analysis possible at a national scale. POLARIS makes the underlying record easier to explore.`,
    '',
    `> AI-assisted draft for a ${audience.toLowerCase()} audience — verify scientific accuracy before publication.`,
    `> Source: ${summarize(input, 18)}`,
  ].join('\n')
}

function buildSocialPost(input: string, audience: Audience): string {
  const kw = topKeywords(input, 4)
  const lead = kw[0] ? titleCase(kw[0]) : 'A new piece of polar research'
  const tag = kw.slice(0, 3).map(k => '#' + k.replace(/[^a-z0-9]/gi, '')).join(' ')

  return `From India\u2019s polar programme — a short thread on "${lead}".

1/ Polar science is far away in distance, close in consequence. What happens at the ice shapes weather, oceans and food security.

2/ This work focuses on ${kw.slice(0, 2).map(titleCase).join(' and ') || 'recent observations'} — small words, big systems.

3/ Why should anyone outside a research lab care? Because the answer eventually reaches classrooms, policy and the climate budget.

— POLARIS (Demo, audience: ${audience})

${tag}`
}

function buildInstagramCaption(input: string, audience: Audience): string {
  const kw = topKeywords(input, 3)
  const focus = kw[0] ? titleCase(kw[0]) : 'Polar Research'
  const emoji = hasAny(input, ['ice','glacier','snow']) ? '🧊'
              : hasAny(input, ['ocean','sea','water','wave']) ? '🌊'
              : hasAny(input, ['atmosphere','air','aerosol','carbon']) ? '🌫️'
              : hasAny(input, ['penguin','bear','whale','biology','species']) ? '🐧'
              : '❄️'

  return `${emoji} ${focus.toUpperCase()} — what the data tells us.

A new piece on POLARIS breaks down the science behind "${summarize(input, 10)}".

🔗 Link in bio · polaris.example.in

AI-assisted draft · ${audience} audience · verify before publishing.

#PolarScience #Climate #India #NCPOR ${kw.slice(0, 2).map(k => '#' + k.replace(/[^a-z0-9]/gi, '')).join(' ')}`
}

function buildVideoScript(input: string, audience: Audience): string {
  const kw = topKeywords(input, 3)
  const lead = kw[0] ? titleCase(kw[0]) : 'the new finding'
  const nums = findNumbers(input)
  const numLine = nums.length > 0 ? `On screen: ${nums.join(' · ')}.` : ''

  return [
    `POLARIS — Short Video Script (${audience})`,
    ``,
    `OPEN ON a wide, cinematic shot of an Antarctic ice shelf at twilight.`,
    ``,
    `NARRATOR: "There is a place on Earth where almost no one lives — and yet what happens there shapes the weather, oceans and food of billions."`,
    ``,
    `CUT TO: time-lapse of sea ice forming, ships, research stations, students.`,
    ``,
    `NARRATOR: "Today we are talking about ${lead}."`,
    numLine,
    ``,
    `NARRATOR: "In under a minute, here is what the science says, why it matters, and what to watch next."`,
    ``,
    `CUT TO: a single chart, narrated simply.`,
    ``,
    `NARRATOR: "The data is real. The stakes are real. And the public conversation matters."`,
    ``,
    `END ON: POLARIS logo and a clear call-to-action.`,
    ``,
    `(Source: ${summarize(input, 14)})`,
    `(AI-assisted draft — verify scientific accuracy before publication.)`,
  ].join('\n')
}

export async function generateAIDrafts(input: string, audience: Audience): Promise<AIDraft> {
  if (!input.trim()) {
    throw new Error('Please paste a scientific report, abstract or research text to begin.')
  }
  await new Promise(r => setTimeout(r, 700))
  return {
    simpleExplanation: buildSimpleExplanation(input, audience),
    websiteArticle: buildWebsiteArticle(input, audience),
    socialPost: buildSocialPost(input, audience),
    instagramCaption: buildInstagramCaption(input, audience),
    videoScript: buildVideoScript(input, audience),
  }
}

function readApiKey(): string | null {
  try {
    return (import.meta as any).env?.VITE_AI_API_KEY ?? null
  } catch {
    return null
  }
}

export const AI_SERVICE_INFO = {
  provider: 'demo-mock',
  ready: false,
  envKey: readApiKey(),
  note: 'A real LLM can be connected by implementing generateAIDrafts() to call an API.',
}
