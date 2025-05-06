'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';
import { useThemeStore, getThemeClass } from '@/lib/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { color } = useThemeStore();
  
  useEffect(() => {
    // Remove all theme classes first
    document.documentElement.classList.forEach(className => {
      if (className.startsWith('theme-')) {
        document.documentElement.classList.remove(className);
      }
    });
    
    // Add the current theme class
    document.documentElement.classList.add(getThemeClass(color));
  }, [color]);
  
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}