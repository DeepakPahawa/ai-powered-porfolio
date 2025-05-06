'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import { SKILLS } from '@/lib/constants';
import { useThemeStore, getBackgroundClass } from '@/lib/theme';
import { useTheme } from 'next-themes';

export default function Skills() {
  const { backgroundStyle } = useThemeStore();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const backgroundClass = getBackgroundClass(backgroundStyle, isDark === true);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className={cn("section-padding", backgroundClass)}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">Technical Skills</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            My technical expertise across various programming languages, frameworks, and tools.
          </p>
        </motion.div>

        <div 
          ref={ref} 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {SKILLS.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg border shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{skill.name}</h3>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}