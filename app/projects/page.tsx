"use client";
import { useState, useMemo } from "react";
import { Search, ExternalLink, Github, Filter } from "lucide-react";
import { Project } from "../types";
import invoice from "../assets/invoice.png";
import spy from "../assets/spy.png";
import TextExt from "../assets/TextExt.png";
import AudioProcessing from "../assets/AudioProcessing.png";
import pathfinder from "../assets/pathfinder.png";

const projects: Project[] = [
  {
    id: "p1",
    title: "Invoice-Book",
    description:
      "A responsive web application built with React and Tailwind CSS featuring smooth Exprience and a user-friendly interface to generate and manage invoices.",
    image: invoice,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Tauri", "Rust"],
    category: ["Web"],
    githubUrl: "https://github.com/NitishKumar078/Invoice-Book",
  },
  {
    id: "p2",
    title: "Spy",
    description:
      "Capture real-time images and monitor keyboard and mouse actions for specific windows on a PC.",
    technologies: [".Net", "C#", "UIAutomation", "WPF"],
    image: spy,
    category: ["Web"],
    githubUrl: "https://github.com/NitishKumar078/Spy",
  },
  {
    id: "p3",
    title: "Path_finder",
    description:
      "Implemented and demonstrated the functionality of five distinct path-finding algorithms, including BFS, DFS, Dijkstra's, A*, and Greedy algorithms.",
    technologies: ["js", "TypeScript", "Prisma", "tRPC"],
    image: pathfinder,
    category: ["Web"],
    demoUrl: "https://nitishkumar078.github.io/Path_finder/",
    githubUrl: "https://github.com/NitishKumar078/Path_finder",
  },
  {
    id: "p4",
    title: "Text-Extractor",
    description:
      "This is a web_Extensions which help to scrape the text for the selected html element in the browser.",
    technologies: ["React", "Chrome Extension", "Chrome api"],
    image: TextExt,
    category: ["Web", "Chrome Extention"],
    githubUrl: "https://github.com/NitishKumar078/Text-Extractor",
  },
  {
    id: "p5",
    title: "Audio-Processing",
    description:
      "Audio Extraction from given video and processing it to transcript(speech to text)",
    technologies: ["python", "thinter"],
    image: AudioProcessing,
    category: ["Window", "AI"],
    githubUrl: "https://github.com/NitishKumar078/Audio-Processing",
  },
];

const categories = ["All", "Web", "Chrome Extention", "AI", "Design"];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" ||
        project.category.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">My Projects</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of my work showcasing web development, mobile
            applications, and design projects.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-2 mb-8 mr-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="relative md:w-48">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="overflow-ellipsis w-fit px-1 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:border-primary dark:hover:border-primary transition-colors duration-200 flex items-center justify-between"
            >
              <span>{selectedCategory}</span>
              <Filter className="w-4 h-4" />
            </button>

            {isFilterOpen && (
              <div className="absolute top-full left-0 right-0  py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-lg z-10 overflow-ellipsis w-fit">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200 ${
                      selectedCategory === category ? "text-primary" : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:border-primary dark:hover:border-primary transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={
                    typeof project.image === "string"
                      ? project.image
                      : project.image.src
                  }
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-sm rounded-full bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors duration-200"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
