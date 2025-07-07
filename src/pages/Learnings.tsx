import { technologies } from "../lib/FormatData";
import invoice from "../assets/invoice.png";
import { Link } from "react-router-dom";

const Learnings = () => {
  const filteredProjects: technologies[] = [
    {
      id: "p1",
      title: "HTML",
      image: invoice,
      toUrl: "/learnings/HTML",
    },
    {
      id: "p1",
      title: "Invoice-Book",
      image: invoice,
      toUrl: "https://nitishkumar078.github.io/Path_finder/",
    },
    {
      id: "p1",
      title: "Invoice-Book",
      image: invoice,
      toUrl: "https://nitishkumar078.github.io/Path_finder/",
    },
    {
      id: "p1",
      title: "Invoice-Book",
      image: invoice,
      toUrl: "https://nitishkumar078.github.io/Path_finder/",
    },
  ];
  return (
    <div className="min-h-screen py-20 px-28">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Link to={project.toUrl}>
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
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Learnings;
