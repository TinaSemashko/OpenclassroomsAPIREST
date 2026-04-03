'use client'

import { styled, keyframes } from '@mui/material/styles'

const squat1 = keyframes`
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.25); }
`

const squat2 = keyframes`
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.2); }
`

const squat3 = keyframes`
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.3); }
`

const Svg = styled('svg')`
  .bar1 { transform-origin: bottom; animation: ${squat1} 3s ease-in-out infinite; }
  .bar2 { transform-origin: bottom; animation: ${squat2} 3s ease-in-out 0.2s infinite; }
  .bar3 { transform-origin: bottom; animation: ${squat3} 3s ease-in-out 0.4s infinite; }
  .bar4 { transform-origin: bottom; animation: ${squat2} 3s ease-in-out 0.6s infinite; }
  .bar5 { transform-origin: bottom; animation: ${squat1} 3s ease-in-out 0.3s infinite; }
`

const LogoIcon = () => (
  <Svg width="28" height="24" viewBox="0 0 28 24" fill="none">
    <defs>
      <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#0000ff" />
        <stop offset="30%" stopColor="#0000ff" />
        <stop offset="100%" stopColor="#ff0000" />
      </linearGradient>
    </defs>
    <rect className="bar1" x="0"  y="4"  width="4" height="20" rx="2" fill="url(#barGradient)" />
    <rect className="bar2" x="6"  y="2"  width="4" height="22" rx="2" fill="url(#barGradient)" />
    <rect className="bar3" x="12" y="0"  width="4" height="24" rx="2" fill="url(#barGradient)" />
    <rect className="bar4" x="18" y="6"  width="4" height="18" rx="2" fill="url(#barGradient)" />
    <rect className="bar5" x="24" y="3"  width="4" height="21" rx="2" fill="url(#barGradient)" />
  </Svg>
)

export default LogoIcon
