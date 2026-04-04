'use client'

import { Box, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        gap: 2,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: 96, fontWeight: 700, color: 'primary.main' }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
        Page introuvable
      </Typography>
      <Typography sx={{ color: 'text.secondary', maxWidth: 400 }}>
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </Typography>
      <Button
        variant="contained"
        onClick={() => router.push('/dashboard')}
        sx={{
          mt: 2,
          bgcolor: 'primary.main',
          textTransform: 'none',
          borderRadius: 2,
          px: 4,
          py: 1.5,
          '&:hover': { bgcolor: 'primary.dark' },
        }}
      >
        Retour au tableau de bord
      </Button>
    </Box>
  )
}
