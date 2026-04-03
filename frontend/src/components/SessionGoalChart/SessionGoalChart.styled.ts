'use client'

import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

export const ChartWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`

export const GoalTitle = styled(Typography)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.text.secondary};

  span {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

export const GoalSubtitle = styled(Typography)`
  font-size: 13px;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 8px;
`

export const DonutContainer = styled(Box)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LegendTopRight = styled(Typography)`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.palette.text.secondary};
  display: flex;
  align-items: center;
  gap: 6px;
`

export const LegendBottomLeft = styled(Typography)`
  position: absolute;
  bottom: 8px;
  left: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.palette.text.secondary};
  display: flex;
  align-items: center;
  gap: 6px;
`

export const LegendDot = styled('span')<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  display: inline-block;
`
