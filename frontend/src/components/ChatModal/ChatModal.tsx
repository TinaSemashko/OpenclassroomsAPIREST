'use client'

import { useEffect, useRef, useState } from 'react'
import { Typography, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import {
  Overlay,
  ModalContainer,
  Header,
  CloseButton,
  MessagesArea,
  EmptyTitle,
  MessageRow,
  MessageBubble,
  AssistantLabel,
  LoadingDots,
  Dot,
  ChatInput,
  SendButton,
  SuggestionsRow,
  SuggestionChip,
} from './ChatModal.styled'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatModalProps {
  open: boolean
  onClose: () => void
}

const SUGGESTIONS = [
  'Comment améliorer mon endurance ?',
  'Que signifie mon score de récupération ?',
  'Peux-tu m\'expliquer mon dernier graphique ?',
]

const ChatModal = ({ open, onClose }: ChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  if (!open) return null

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || loading) return

    const updated = [...messages, { role: 'user' as const, content }]
    setMessages(updated)
    setInput('')
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erreur du service')
        return
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ])
    } catch {
      setError('Impossible de contacter le service')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <CloseButton onClick={onClose}>
            <Typography variant="body2" sx={{ mr: 0.5 }}>Fermer</Typography>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </Header>

        <MessagesArea>
          {messages.length === 0 && (
            <EmptyTitle>
              Posez vos questions sur votre programme,
              <br />
              vos performances ou vos objectifs
            </EmptyTitle>
          )}

          {messages.map((msg, i) => (
            <MessageRow key={i} owner={msg.role}>
              <MessageBubble owner={msg.role}>
                {msg.role === 'assistant' && (
                  <AssistantLabel variant="caption">Coach AI</AssistantLabel>
                )}
                <Typography variant="body2">{msg.content}</Typography>
              </MessageBubble>
            </MessageRow>
          ))}

          {loading && (
            <LoadingDots>
              <Dot delay={0} />
              <Dot delay={0.2} />
              <Dot delay={0.4} />
            </LoadingDots>
          )}
          <div ref={messagesEndRef} />
        </MessagesArea>

        {error && (
          <Alert severity="error" sx={{ mt: 1 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <ChatInput
          fullWidth
          multiline
          maxRows={3}
          placeholder="Comment puis-je vous aider ?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          slotProps={{
            input: {
              endAdornment: (
                <SendButton
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  size="small"
                >
                  <ArrowUpwardIcon fontSize="small" />
                </SendButton>
              ),
            },
          }}
        />

        <SuggestionsRow>
          {SUGGESTIONS.map((s) => (
            <SuggestionChip key={s} onClick={() => handleSend(s)}>
              {s}
            </SuggestionChip>
          ))}
        </SuggestionsRow>
      </ModalContainer>
    </Overlay>
  )
}

export default ChatModal
