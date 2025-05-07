"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { EXPERIENCE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useThemeStore, getBackgroundClass } from "@/lib/theme";
import { useTheme } from "next-themes";

export default function Experience() {
  const { backgroundStyle } = useThemeStore();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const backgroundClass = getBackgroundClass(backgroundStyle, isDark === true);

  return (
    <section id="experience" className={cn("section-padding", backgroundClass)}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">My Experience</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            {`A chronological journey through my professional career, showcasing
            the roles I've had and the impact I've made.`}
          </p>
        </motion.div>

        <div className="space-y-12 relative">
          {EXPERIENCE.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof EXPERIENCE)[0];
  index: number;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -20 : 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr] gap-4 relative"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Dot and line */}
      <div className="relative flex justify-center">
        <div className="absolute top-0 bottom-0 w-px bg-border" />
        <div className="w-4 h-4 bg-primary rounded-full z-10 mt-1" />
      </div>

      {/* Timeline content */}
      <div className="space-y-2">
        <div className="text-sm text-primary md:text-xl font-semibold">
          {item.period}
        </div>
        <div className="text-sm text-muted-foreground">{item.company}</div>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
          <div className="flex-shrink-0 w-14 h-14 rounded-md overflow-hidden">
            <Image
              src={item.logo}
              alt={item.company}
              width={60}
              height={60}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="heading-sm">{item.title}</h3>
            <p className="text-muted-foreground">Project: {item.project}</p>
          </div>
        </div>
        <p>{item.description}</p>
      </div>
    </motion.div>
  );
}
