'use client';

import Image from 'next/image';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useThemeStore, getBackgroundClass } from '@/lib/theme';
import { useTheme } from 'next-themes';

export default function Hero() {
  const { backgroundStyle } = useThemeStore();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const backgroundClass = getBackgroundClass(backgroundStyle, isDark === true);

  return (
    <section 
      id="home" 
      className={cn(
        "min-h-screen flex items-center pt-20", 
        backgroundClass
      )}
    >
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 py-12 md:py-20">
        <motion.div 
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-primary font-medium mb-2">{`Hello, I'm`}</p>
            <h1 className="heading-xl mb-6">
              Deepak Pahawa
              <span className="block text-primary">Full Stack Developer</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              I build exceptional digital experiences with modern technologies.
              Specializing in creating scalable, user-friendly web applications.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button asChild>
              <a href="#contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#experience">View My Work</a>
            </Button>
          </motion.div>

          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:hello@example.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex items-center justify-center order-first md:order-last"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full max-w-lg aspect-square">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
            <Image
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Professional Portrait"
              width={500}
              height={500}
              className="object-cover rounded-3xl shadow-xl z-10 relative"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}