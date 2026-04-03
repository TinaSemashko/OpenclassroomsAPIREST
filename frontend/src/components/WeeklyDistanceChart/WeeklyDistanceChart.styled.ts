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
  color: ${({ theme }) => theme.palette.primary.main};
`

export const ChartSubtitle = styled(Typography)`
  font-size: 12px;
  color: ${({ theme }) => theme.palette.text.secondary};
`
