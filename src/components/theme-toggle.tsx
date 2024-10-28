'use client';

import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { SunIcon } from './sun-icon'
import { MoonIcon } from './moon-icon'
import { useTheme } from 'next-themes'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      isIconOnly
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      variant="flat"
      size="md"
      className="rounded-full"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
