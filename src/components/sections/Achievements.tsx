'use client';

import { motion } from 'framer-motion';
import { Trophy, Mic2, Github, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import { ACHIEVEMENTS } from '@/lib/constants';
import { useThemeStore, getBackgroundClass } from '@/lib/theme';
import { useTheme } from 'next-themes';

const iconMap: Record<string, React.ReactNode> = {
  'Trophy': <Trophy className="h-8 w-8" />,
  'Mic2': <Mic2 className="h-8 w-8" />,
  'Github': <Github className="h-8 w-8" />,
  'Rocket': <Rocket className="h-8 w-8" />,
};

export default function Achievements() {
  const { backgroundStyle } = useThemeStore();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const backgroundClass = getBackgroundClass(backgroundStyle, isDark === true);
  
  return (
    <section id="achievements" className={cn("section-padding", backgroundClass)}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">Achievements</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Notable accomplishments and recognition received throughout my career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((achievement, index) => (
            <AchievementCard 
              key={achievement.title} 
              achievement={achievement} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementCard({ 
  achievement, 
  index 
}: { 
  achievement: typeof ACHIEVEMENTS[0],
  index: number
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card border rounded-xl p-6 shadow-sm h-full"
    >
      <div className="mb-4 text-primary">
        {iconMap[achievement.icon]}
      </div>
      <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
      <p className="text-muted-foreground mb-4">{achievement.description}</p>
      <div className="mt-auto">
        <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
          {achievement.year}
        </span>
      </div>
    </motion.div>
  );
}