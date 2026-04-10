'use client'

import { styled, keyframes } from '@mui/material/styles'
import { Box, IconButton, TextField, Typography } from '@mui/material'

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
`

export const Overlay = styled(Box)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1300;
`

export const ModalContainer = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 12px;
  width: 90%;
  max-width: 700px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  padding: 24px;
`

export const Header = styled(Box)`
  display: flex;
  justify-content: flex-end;
`

export const CloseButton = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const MessagesArea = styled(Box)`
  flex: 1;
  overflow-y: auto;
  margin-top: 16px;
`

export const EmptyTitle = styled(Typography)`
  text-align: center;
  color: ${({ theme }) => theme.palette.error.main};
  font-weight: 700;
  font-size: 20px;
  margin-top: 32px;
`

export const MessageRow = styled(Box)<{ owner: 'user' | 'assistant' }>`
  display: flex;
  justify-content: ${({ owner }) => (owner === 'user' ? 'flex-end' : 'flex-start')};
  margin-bottom: 16px;
`

export const MessageBubble = styled(Box)<{ owner: 'user' | 'assistant' }>`
  max-width: 70%;
  background-color: ${({ owner }) => (owner === 'user' ? '#fde8e4' : '#f5f5f5')};
  border-radius: 8px;
  padding: 16px;
`

export const AssistantLabel = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 8px;
  display: block;
`

export const LoadingDots = styled(Box)`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-left: 8px;
`

export const Dot = styled(Box)<{ delay: number }>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.error.main};
  animation: ${bounce} 1.4s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay}s;
`

export const ChatInput = styled(TextField)`
  margin-top: 16px;
`

export const SendButton = styled(IconButton)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: white;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }

  &.Mui-disabled {
    background-color: ${({ theme }) => theme.palette.grey[300]};
    color: white;
  }
`

export const SuggestionsRow = styled(Box)`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`

export const SuggestionChip = styled(Box)`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    border-color: ${({ theme }) => theme.palette.primary.main};
    background-color: ${({ theme }) => theme.palette.grey[50]};
  }
`
