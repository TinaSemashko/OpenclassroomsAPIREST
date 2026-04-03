'use client'

import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { RunningSession } from '@/lib/useUserData'
import { ChartHeader, ChartTitle, ChartSubtitle } from './WeeklyDistanceChart.styled'

interface WeeklyDistanceChartProps {
  sessions: RunningSession[]
}

interface WeekData {
  name: string
  km: number
  startDate: string
  endDate: string
}

const getMonday = (date: Date) => {
  const d = new Date(date)
  const dayOfWeek = d.getDay()
  d.setDate(d.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  d.setHours(0, 0, 0, 0)
  return d
}

const formatShortDate = (date: Date) =>
  date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })

const WeeklyDistanceChart = ({ sessions }: WeeklyDistanceChartProps) => {
  const theme = useTheme()

  const { weeklyData, average } = useMemo(() => {
    // Regroupe les sessions par semaine (lundi)
    const weeks = new Map<string, { km: number; start: Date; end: Date }>()

    sessions.forEach((s) => {
      const sessionDate = new Date(s.date)
      const monday = getMonday(sessionDate)
      const key = monday.toISOString().split('T')[0]

      if (!weeks.has(key)) {
        const sunday = new Date(monday)
        sunday.setDate(monday.getDate() + 6)
        weeks.set(key, { km: 0, start: monday, end: sunday })
      }
      weeks.get(key)!.km += s.distance
    })

    // Trie par date et prend les 4 dernières semaines
    const sorted = [...weeks.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-4)

    const data: WeekData[] = sorted.map(([, week], i) => ({
      name: `S${i + 1}`,
      km: Math.round(week.km * 10) / 10,
      startDate: formatShortDate(week.start),
      endDate: formatShortDate(week.end),
    }))

    const avg =
      data.length > 0
        ? Math.round(data.reduce((sum, d) => sum + d.km, 0) / data.length)
        : 0

    return { weeklyData: data, average: avg }
  }, [sessions])

  if (weeklyData.length === 0) {
    return <Typography color="text.secondary">Aucune donnée disponible</Typography>
  }

  const dateRange = `${weeklyData[0].startDate} - ${weeklyData[weeklyData.length - 1].endDate}`

  return (
    <>
      <ChartHeader>
        <div>
          <ChartTitle>{average}km en moyenne</ChartTitle>
          <ChartSubtitle>Total des kilomètres 4 dernières semaines</ChartSubtitle>
        </div>
        <ChartSubtitle>{dateRange}</ChartSubtitle>
      </ChartHeader>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={weeklyData}>
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(value: number) => [`${value} km`, 'Distance']}
            labelFormatter={(_label: string, payload: { payload?: WeekData }[]) => {
              if (payload?.[0]?.payload) {
                const d = payload[0].payload
                return `${d.startDate} au ${d.endDate}`
              }
              return ''
            }}
            contentStyle={{
              backgroundColor: '#333',
              border: 'none',
              borderRadius: 8,
              color: '#fff',
            }}
            itemStyle={{ color: '#fff' }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend
            formatter={() => 'Km'}
            iconType="circle"
            iconSize={8}
          />
          <Bar
            dataKey="km"
            fill={theme.palette.primary.main}
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default WeeklyDistanceChart
