'use client';

import { Check, Circle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useThemeStore } from '@/lib/theme';
import { COLORS, BACKGROUND_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function ThemeSelector() {
  const { theme } = useTheme();
  const { color, backgroundStyle, setColor, setBackgroundStyle } = useThemeStore();
  const isDark = theme === 'dark';

  const colorMap = {
    'red': 'bg-red-500',
    'rose': 'bg-rose-500',
    'orange': 'bg-orange-500',
    'green': 'bg-green-500',
    'blue': 'bg-blue-500',
    'violet': 'bg-violet-500',
    'zinc': 'bg-zinc-500',
    'yellow': 'bg-yellow-500',
  };

  return (
    <div className="p-2 min-w-[240px]">
      <DropdownMenuLabel>Customize Theme</DropdownMenuLabel>
      <DropdownMenuSeparator />
      
      <Tabs defaultValue="colors">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="background">Background</TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors" className="mt-2">
          <div className="grid grid-cols-4 gap-2">
            {COLORS.map((item) => (
              <button
                key={item.value}
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center ring-offset-2',
                  colorMap[item.value as keyof typeof colorMap],
                  color === item.value && 'ring-2 ring-foreground'
                )}
                onClick={() => setColor(item.value as any)}
                title={item.name}
              >
                {color === item.value && <Check className="text-white h-4 w-4" />}
              </button>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="background" className="mt-2">
          <div className="grid grid-cols-2 gap-2">
            {BACKGROUND_COLORS.map((item) => (
              <button
                key={item.value}
                className={cn(
                  'flex items-center gap-2 p-2 rounded-md',
                  backgroundStyle === item.value && 'bg-accent'
                )}
                onClick={() => setBackgroundStyle(item.value as any)}
              >
                <div className={cn(
                  'w-6 h-6 rounded-full border',
                  item.value === 'default' && (isDark ? 'bg-black' : 'bg-white'),
                  item.value === 'subtle' && (isDark ? 'bg-slate-900' : 'bg-slate-100'),
                  item.value === 'muted' && (isDark ? 'bg-slate-800' : 'bg-slate-200'),
                  item.value === 'gradient' && (isDark ? 'bg-gradient-to-b from-black to-slate-800' : 'bg-gradient-to-b from-white to-slate-200')
                )}>
                  {backgroundStyle === item.value && <Circle className="h-2 w-2 text-primary m-auto" fill="currentColor" />}
                </div>
                <span className="text-sm">{item.name}</span>
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}