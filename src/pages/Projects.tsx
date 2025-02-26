import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Github, Filter } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 'p1',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory management, secure payments, and an intuitive admin dashboard.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    category: 'Web',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project',
  },
  {
    id: 'p2',
    title: 'Weather Dashboard',
    description: 'Real-time weather monitoring dashboard with interactive maps, historical data analysis, and severe weather alerts.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=800',
    technologies: ['TypeScript', 'Next.js', 'TailwindCSS', 'OpenWeather API'],
    category: 'Web',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project',
  },
  {
    id: 'p3',
    title: 'Task Management App',
    description: 'Mobile-first task management application with real-time collaboration, file sharing, and progress tracking features.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    technologies: ['React Native', 'Firebase', 'Redux'],
    category: 'Mobile',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project',
  },
  {
    id: 'p4',
    title: 'AI Image Generator',
    description: 'Web application that generates unique artwork using machine learning algorithms and allows users to customize parameters.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    technologies: ['Python', 'TensorFlow', 'Flask', 'React'],
    category: 'AI',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project',
  },
  {
    id: 'p5',
    title: 'Portfolio Website',
    description: 'Modern portfolio website with dynamic weather effects, interactive timeline, and responsive design.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'TypeScript', 'TailwindCSS'],
    category: 'Design',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project',
  },
  {
    id: 'p6',
    title: 'Fitness Tracker',
    description: 'Cross-platform fitness tracking application with workout planning, progress visualization, and social features.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800',
    technologies: ['Flutter', 'Firebase', 'GraphQL'],
    category: 'Mobile',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project',
  },
];

const categories = ['All', 'Web', 'Mobile', 'AI', 'Design'];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.technologies.some(tech => 
                            tech.toLowerCase().includes(searchQuery.toLowerCase())
                          );
      
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">My Projects</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of my work showcasing web development, mobile applications,
            and design projects.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
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
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:border-primary dark:hover:border-primary transition-colors duration-200 flex items-center justify-between"
            >
              <span>{selectedCategory}</span>
              <Filter className="w-4 h-4" />
            </button>
            
            {isFilterOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-lg z-10">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200 ${
                      selectedCategory === category ? 'text-primary' : ''
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
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="group relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:border-primary dark:hover:border-primary transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
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
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-sm rounded-full bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
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