'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

/**
 * Theme Provider component that wraps the application with next-themes.
 * Enables dark/light mode switching throughout the application.
 *
 * @component
 * @param props - ThemeProviderProps from next-themes
 * @param props.children - Child components to wrap with theme context
 * @returns React component providing theme context
 *
 * @example
 * <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
