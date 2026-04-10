import { NextRequest, NextResponse } from 'next/server'
import systemPrompt from './prompt.json'

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions'
const MISTRAL_MODEL = 'mistral-small-latest'
const MAX_HISTORY = 10

export const POST = async (req: NextRequest) => {
  const apiKey = process.env.MISTRAL_API_KEY
  if (!apiKey) {
    console.error('[chat] MISTRAL_API_KEY is not set')
    return NextResponse.json(
      { error: 'Configuration serveur manquante' },
      { status: 500 }
    )
  }

  const body = await req.json()
  const { messages } = body

  // Validate: messages must be a non-empty array
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: 'Les messages sont requis' },
      { status: 400 }
    )
  }

  // Validate last message
  const last = messages[messages.length - 1]
  if (!last?.content || typeof last.content !== 'string' || last.content.trim().length === 0) {
    return NextResponse.json(
      { error: 'Le message est requis' },
      { status: 400 }
    )
  }

  if (last.content.length > 2000) {
    return NextResponse.json(
      { error: 'Le message est trop long (max 2000 caractères)' },
      { status: 400 }
    )
  }

  // Keep only the last N messages and sanitize
  const history = messages.slice(-MAX_HISTORY).map((msg: { role: string; content: string }) => ({
    role: msg.role,
    content: msg.content.replace(/<[^>]*>/g, ''),
  }))

  try {
    console.log('[chat] Sending request to Mistral')

    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MISTRAL_MODEL,
        messages: [
          systemPrompt,
          ...history,
        ],
      }),
      signal: AbortSignal.timeout(15000),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error(`[chat] Mistral error ${response.status}: ${err}`)
      return NextResponse.json(
        { error: 'Erreur du service IA' },
        { status: 502 }
      )
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content ?? ''

    console.log('[chat] Response received from Mistral')

    return NextResponse.json({ reply })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      console.error('[chat] Mistral request timed out')
      return NextResponse.json(
        { error: 'Le service IA met trop de temps à répondre' },
        { status: 504 }
      )
    }
    console.error('[chat] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur inattendue' },
      { status: 500 }
    )
  }
}
