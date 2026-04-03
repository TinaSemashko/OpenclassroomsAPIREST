'use client'

import { useMemo, useState } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Typography } from '@mui/material'
import type { RunningSession } from '@/lib/useUserData'
import {
  ChartHeader,
  ChartTitle,
  ChartSubtitle,
  DateNav,
  DateNavArrow,
} from './WeeklyDistanceChart.styled'

interface WeeklyDistanceChartProps {
  sessions: RunningSession[]
}

interface WeekData {
  name: string
  km: number
  startDate: string
  endDate: string
}

const WINDOW = 4

const getMonday = (date: Date) => {
  const d = new Date(date)
  const dayOfWeek = d.getDay()
  d.setDate(d.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  d.setHours(0, 0, 0, 0)
  return d
}

const formatShortDate = (date: Date) =>
  date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })

const formatLongDate = (date: Date) =>
  date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })

const WeeklyDistanceChart = ({ sessions }: WeeklyDistanceChartProps) => {
  const [offset, setOffset] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const allWeeks = useMemo(() => {
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

    return [...weeks.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [sessions])

  const total = allWeeks.length
  const endIdx = total - offset
  const startIdx = Math.max(0, endIdx - WINDOW)
  const visibleWeeks = allWeeks.slice(startIdx, endIdx)

  const canPrev = startIdx > 0
  const canNext = offset > 0

  const weeklyData: WeekData[] = visibleWeeks.map(([, week], i) => ({
    name: `S${i + 1}`,
    km: Math.round(week.km * 10) / 10,
    startDate: formatShortDate(week.start),
    endDate: formatShortDate(week.end),
  }))

  const average =
    weeklyData.length > 0
      ? Math.round(weeklyData.reduce((sum, d) => sum + d.km, 0) / weeklyData.length)
      : 0

  if (total === 0) {
    return <Typography color="text.secondary">Aucune donnée disponible</Typography>
  }

  const rangeStart = visibleWeeks[0][1].start
  const rangeEnd = visibleWeeks[visibleWeeks.length - 1][1].end

  return (
    <>
      <ChartHeader>
        <div>
          <ChartTitle>{average}km en moyenne</ChartTitle>
          <ChartSubtitle>Total des kilomètres 4 dernières semaines</ChartSubtitle>
        </div>
        <DateNav>
          <DateNavArrow
            onClick={() => canPrev && setOffset((o) => o + 1)}
            style={{ opacity: canPrev ? 1 : 0.3, cursor: canPrev ? 'pointer' : 'default' }}
          >
            &lt;
          </DateNavArrow>
          {formatLongDate(rangeStart)} - {formatLongDate(rangeEnd)}
          <DateNavArrow
            onClick={() => canNext && setOffset((o) => o - 1)}
            style={{ opacity: canNext ? 1 : 0.3, cursor: canNext ? 'pointer' : 'default' }}
          >
            &gt;
          </DateNavArrow>
        </DateNav>
      </ChartHeader>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={weeklyData}
          onMouseMove={(state) => {
            if (state?.activeTooltipIndex !== undefined) {
              setActiveIndex(Number(state.activeTooltipIndex))
            }
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip
            cursor={false}
            formatter={(value) => [`${value} km`, 'Distance']}
            labelFormatter={(_label, payload) => {
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
            radius={[4, 4, 0, 0]}
            barSize={20}
          >
            {weeklyData.map((_, i) => {
              let fill = '#b3b3e6'
              if (hovered) fill = '#6666cc'
              if (activeIndex === i) fill = '#0000ff'
              return <Cell key={i} fill={fill} />
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>
    </>
  )
}

export default WeeklyDistanceChart
