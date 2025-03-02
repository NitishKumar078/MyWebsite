import React from "react";
import {
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
  Star,
} from "lucide-react";
import { TimelineItem } from "../types";

const experiences: TimelineItem[] = [
  {
    id: "exp1",
    title: "Senior Software Developer",
    company: "Tech Innovations Inc.",
    period: "2021 - Present",
    description:
      "Led development of cloud-native applications using React and Node.js. Mentored junior developers and implemented CI/CD pipelines.",
  },
  {
    id: "exp3",
    title: "Junior Developer",
    company: "StartUp Hub",
    period: "2018 - 2019",
    description:
      "Collaborated in agile team to deliver web applications. Implemented responsive designs and integrated third-party APIs.",
  },
];

const education = [
  {
    id: "edu1",
    title: "Master of Computer Science",
    company: "Tech University",
    period: "2016 - 2018",
    description:
      "Specialized in Software Engineering. Graduated with honors. Research focus on distributed systems.",
  },
  {
    id: "edu2",
    title: "Bachelor of Computer Science",
    company: "State University",
    period: "2012 - 2016",
    description:
      "Dean's List all semesters. Led programming club. Completed internship at major tech company.",
  },
];

const skills = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Redis"] },
  { category: "DevOps", items: ["Docker", "AWS", "CI/CD", "Kubernetes"] },
  { category: "Tools", items: ["Git", "VS Code", "Figma", "Postman"] },
];

const certifications = [
  "AWS Certified Solutions Architect",
  "Google Cloud Professional Developer",
  "MongoDB Certified Developer",
  "Certified Kubernetes Administrator",
];

const TimelineSection = ({
  items,
  icon: Icon,
  title,
}: {
  items: TimelineItem[];
  icon: React.ElementType;
  title: string;
}) => (
  <div className="mb-12">
    <div className="flex items-center gap-2 mb-6">
      <Icon className="w-6 h-6 text-primary" />
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
    <div className="space-y-8">
      {items.map((item, index) => (
        <div key={item.id} className="relative pl-8 group">
          <div className="absolute left-0 top-0 w-4 h-4 rounded-full border-2 border-primary bg-white dark:bg-slate-900 group-hover:bg-primary transition-colors duration-300" />
          {index !== items.length - 1 && (
            <div className="absolute left-[7px] top-4 w-[2px] h-[calc(100%+2rem)] bg-gray-200 dark:bg-gray-700" />
          )}
          <div className="group-hover:translate-x-2 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span>{item.period}</span>
              <ChevronRight className="w-4 h-4" />
              <span>{item.company}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SkillsSection = () => (
  <div className="mb-12">
    <div className="flex items-center gap-2 mb-6">
      <Star className="w-6 h-6 text-primary" />
      <h2 className="text-2xl font-bold">Skills & Expertise</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {skills.map(({ category, items }) => (
        <div
          key={category}
          className="p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors duration-300"
        >
          <h3 className="font-bold mb-3">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <span
                key={item}
                className="px-2 py-1 text-sm rounded-full bg-primary/10 text-primary"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CertificationsSection = () => (
  <div className="mb-12">
    <div className="flex items-center gap-2 mb-6">
      <Award className="w-6 h-6 text-primary" />
      <h2 className="text-2xl font-bold">Certifications</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {certifications.map((cert) => (
        <div
          key={cert}
          className="p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors duration-300 flex items-center gap-3"
        >
          <Award className="w-5 h-5 text-primary" />
          <span>{cert}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate software developer with expertise in full-stack
            development, cloud architecture, and a track record of delivering
            innovative solutions.
          </p>
        </div>

        <TimelineSection
          items={experiences}
          icon={Briefcase}
          title="Professional Experience"
        />

        <TimelineSection items={education} icon={BookOpen} title="Education" />

        <SkillsSection />

        <CertificationsSection />
      </div>
    </div>
  );
}
