import { create } from 'zustand';

type ColorTheme = 'red' | 'rose' | 'orange' | 'green' | 'blue' | 'violet' | 'zinc' | 'yellow';
type BackgroundStyle = 'default' | 'subtle' | 'muted' | 'gradient';

interface ThemeState {
  color: ColorTheme;
  backgroundStyle: BackgroundStyle;
  setColor: (color: ColorTheme) => void;
  setBackgroundStyle: (style: BackgroundStyle) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  color: 'blue',
  backgroundStyle: 'default',
  setColor: (color) => set({ color }),
  setBackgroundStyle: (style) => set({ backgroundStyle: style }),
}));

export const getThemeClass = (color: ColorTheme) => {
  const themeClasses = {
    'red': 'theme-red',
    'rose': 'theme-rose',
    'orange': 'theme-orange',
    'green': 'theme-green',
    'blue': 'theme-blue',
    'violet': 'theme-violet',
    'zinc': 'theme-zinc',
    'yellow': 'theme-yellow',
  };
  
  return themeClasses[color];
};

export const getBackgroundClass = (style: BackgroundStyle, isDark: boolean) => {
  if (isDark) {
    return {
      'default': 'bg-background',
      'subtle': 'bg-muted/30',
      'muted': 'bg-muted/50',
      'gradient': 'bg-gradient-to-b from-background to-muted/70',
    }[style];
  }
  
  return {
    'default': 'bg-background',
    'subtle': 'bg-muted/20',
    'muted': 'bg-muted/30',
    'gradient': 'bg-gradient-to-b from-background to-muted/30',
  }[style];
};