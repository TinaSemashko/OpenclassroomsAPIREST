'use client'

import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

export const ChartHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`

export const ChartTitle = styled(Typography)`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.error.main};
`

export const ChartSubtitle = styled(Typography)`
  font-size: 12px;
  color: ${({ theme }) => theme.palette.text.secondary};
`

export const DateNav = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 12px;
`

export const DateNavArrow = styled('span')`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.palette.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  transition: border-color 0.2s;
  &:hover {
    border-color: ${({ theme }) => theme.palette.error.main};
    color: ${({ theme }) => theme.palette.error.main};
  }
`
