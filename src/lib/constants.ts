export const serverRoutes = {
  PORTFOLIO: "/api/portfolio",
};

export const databaseRoutes = {
  PORTFOLIO: "database/portfolio.json",
};

export const COLORS = [
  { name: "Red", value: "red" },
  { name: "Rose", value: "rose" },
  { name: "Orange", value: "orange" },
  { name: "Green", value: "green" },
  { name: "Blue", value: "blue" },
  { name: "Violet", value: "violet" },
  { name: "Zinc", value: "zinc" },
  { name: "Yellow", value: "yellow" },
];

export const BACKGROUND_COLORS = [
  { name: "Default", value: "default" },
  { name: "Subtle", value: "subtle" },
  { name: "Muted", value: "muted" },
  { name: "Gradient", value: "gradient" },
];

export const EXPERIENCE = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Innovations Inc.",
    description:
      "Led a team of developers to build scalable web applications using React and Node.js. Implemented CI/CD pipelines and improved performance by 40%.",
    period: "2020 - Present",
    logo: "https://images.pexels.com/photos/5598296/pexels-photo-5598296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd",
    description:
      "Developed responsive web applications using Angular and Express. Collaborated with UX/UI designers to implement modern interfaces.",
    period: "2018 - 2020",
    logo: "https://images.pexels.com/photos/5926389/pexels-photo-5926389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "CreativeWeb Agency",
    description:
      "Created interactive web experiences with JavaScript, HTML, and CSS. Optimized website performance and implemented responsive designs.",
    period: "2016 - 2018",
    logo: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export const SKILLS = [
  { name: "JavaScript", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "React", level: 92 },
  { name: "Next.js", level: 88 },
  { name: "Node.js", level: 80 },
  { name: "CSS/SCSS", level: 85 },
  { name: "Tailwind CSS", level: 90 },
  { name: "GraphQL", level: 75 },
  { name: "SQL", level: 78 },
  { name: "AWS", level: 70 },
];

export const ACHIEVEMENTS = [
  {
    title: "Best Developer Award",
    description:
      "Recognized for exceptional contributions to product development and innovation",
    year: "2023",
    icon: "Trophy",
  },
  {
    title: "Speaker at Tech Conference",
    description:
      'Presented on "Building Scalable Web Applications" at the annual DevCon',
    year: "2022",
    icon: "Mic2",
  },
  {
    title: "Open Source Contributor",
    description:
      "Major contributor to popular React component library with over 5k stars on GitHub",
    year: "2021",
    icon: "Github",
  },
  {
    title: "Product Launch Success",
    description:
      "Successfully led the development team for a product with 100k+ users in first month",
    year: "2019",
    icon: "Rocket",
  },
];