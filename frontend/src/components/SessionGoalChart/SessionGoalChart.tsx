'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useTheme } from '@mui/material/styles'
import {
  ChartWrapper,
  GoalTitle,
  GoalSubtitle,
  DonutContainer,
  LegendTopRight,
  LegendBottomLeft,
  LegendDot,
} from './SessionGoalChart.styled'

interface SessionGoalChartProps {
  completed: number
  goal: number
}

const SessionGoalChart = ({ completed, goal }: SessionGoalChartProps) => {
  const theme = useTheme()

  const capped = Math.min(completed, goal)
  const remaining = goal - capped

  const data = [
    { name: 'Réalisées', value: capped },
    { name: 'Restantes', value: remaining },
  ]

  const colorDone = theme.palette.primary.main
  const colorLeft = '#b3b3e6'

  return (
    <ChartWrapper>
      <GoalTitle>
        <span>x{completed}</span> sur objectif de {goal}
      </GoalTitle>
      <GoalSubtitle>Courses hebdomadaire réalisées</GoalSubtitle>

      <DonutContainer>
        <LegendTopRight>
          <LegendDot color={colorLeft} />
          {remaining} restants
        </LegendTopRight>

        <ResponsiveContainer width={220} height={220}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={45}
              outerRadius={90}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              <Cell fill={colorDone} />
              <Cell fill={colorLeft} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <LegendBottomLeft>
          <LegendDot color={colorDone} />
          {capped} réalisées
        </LegendBottomLeft>
      </DonutContainer>
    </ChartWrapper>
  )
}

export default SessionGoalChart
