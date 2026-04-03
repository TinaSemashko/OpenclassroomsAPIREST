'use client'

import { useMemo, useState } from 'react'
import {
  ComposedChart,
  Bar,
  Line,
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
} from './BpmChart.styled'

interface BpmChartProps {
  sessions: RunningSession[]
}

const DAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

const getMonday = (date: Date) => {
  const d = new Date(date)
  const dayOfWeek = d.getDay()
  d.setDate(d.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  d.setHours(0, 0, 0, 0)
  return d
}

const getDayIndex = (dateStr: string) => {
  const day = new Date(dateStr).getDay()
  return day === 0 ? 6 : day - 1
}

const formatLongDate = (date: Date) =>
  date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })

const mean = (arr: number[]) =>
  arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0

const BpmChart = ({ sessions }: BpmChartProps) => {
  const [offset, setOffset] = useState(0)
  const [hovered, setHovered] = useState(false)

  // Toutes les semaines disponibles (triées)
  const allWeeks = useMemo(() => {
    const map = new Map<string, RunningSession[]>()
    sessions.forEach((s) => {
      const monday = getMonday(new Date(s.date))
      const key = monday.toISOString().split('T')[0]
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(s)
    })
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [sessions])

  const total = allWeeks.length
  const currentIdx = total - 1 - offset

  const canPrev = currentIdx > 0
  const canNext = offset > 0

  const weekSessions = total > 0 && currentIdx >= 0 ? allWeeks[currentIdx][1] : []

  const { chartData, averageBpm } = useMemo(() => {
    const days: { min: number[]; max: number[]; avg: number[] }[] = Array.from(
      { length: 7 },
      () => ({ min: [], max: [], avg: [] }),
    )

    weekSessions.forEach((s) => {
      const idx = getDayIndex(s.date)
      days[idx].min.push(s.heartRate.min)
      days[idx].max.push(s.heartRate.max)
      days[idx].avg.push(s.heartRate.average)
    })

    const data = DAY_LABELS.map((label, i) => ({
      name: label,
      min: days[i].min.length > 0 ? mean(days[i].min) : null,
      max: days[i].max.length > 0 ? mean(days[i].max) : null,
      avg: days[i].avg.length > 0 ? mean(days[i].avg) : null,
    }))

    const globalAvg = mean(weekSessions.map((s) => s.heartRate.average))

    return { chartData: data, averageBpm: globalAvg }
  }, [weekSessions])

  if (sessions.length === 0) {
    return <Typography color="text.secondary">Aucune donnée BPM disponible</Typography>
  }

  const mondayDate = total > 0 && currentIdx >= 0
    ? new Date(allWeeks[currentIdx][0])
    : new Date()
  const sundayDate = new Date(mondayDate)
  sundayDate.setDate(mondayDate.getDate() + 6)

  return (
    <>
      <ChartHeader>
        <div>
          <ChartTitle>{averageBpm} BPM</ChartTitle>
          <ChartSubtitle>Fréquence cardiaque moyenne</ChartSubtitle>
        </div>
        <DateNav>
          <DateNavArrow
            onClick={() => canPrev && setOffset((o) => o + 1)}
            style={{ opacity: canPrev ? 1 : 0.3, cursor: canPrev ? 'pointer' : 'default' }}
          >
            &lt;
          </DateNavArrow>
          {formatLongDate(mondayDate)} - {formatLongDate(sundayDate)}
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
        <ComposedChart data={chartData}>
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
          <Tooltip
            cursor={false}
            formatter={(value, name) => {
              const labels: Record<string, string> = {
                min: 'BPM min',
                max: 'BPM max',
                avg: 'BPM moyen',
              }
              return [`${value} bpm`, labels[String(name)] || String(name)]
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
            formatter={(value: string) => {
              const labels: Record<string, string> = {
                min: 'Min',
                max: 'Max BPM',
                avg: 'Moy BPM',
              }
              return labels[value] || value
            }}
            iconType="circle"
            iconSize={8}
          />
          <Bar
            dataKey="min"
            fill="#f5c5b0"
            radius={[3, 3, 0, 0]}
            barSize={10}
            activeBar={false}
          />
          <Bar
            dataKey="max"
            fill="#e74c3c"
            radius={[3, 3, 0, 0]}
            barSize={10}
            activeBar={false}
          />
          <Line
            type="natural"
            dataKey="avg"
            stroke={hovered ? '#0000ff' : '#d4d4e8'}
            strokeWidth={hovered ? 2 : 1}
            dot={{ r: 3, fill: '#0000ff', stroke: '#0000ff', strokeWidth: 0 }}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>
      </div>
    </>
  )
}

export default BpmChart
