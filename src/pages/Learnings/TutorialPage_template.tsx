import React, { useState, useMemo } from "react";
import tutorialData from "./HTMLData.json";
import { TutorialData, Topic } from "../../types";

const MinimalHTMLTutorialPage: React.FC = () => {
  // Cast the imported JSON as our defined type.
  const data: TutorialData = tutorialData;

  // Flatten topics from all sections for easy navigation.
  const flattenedTopics: Topic[] = useMemo(() => {
    return data.sections.reduce<Topic[]>(
      (acc, section) => acc.concat(section.topics),
      []
    );
  }, [data.sections]);

  // Default to the first topic, or an empty string if none.
  const [currentTopicId, setCurrentTopicId] = useState<string>(
    flattenedTopics[0]?.id || ""
  );

  // Get the current topic object and its index.
  const currentTopic = flattenedTopics.find(
    (topic) => topic.id === currentTopicId
  );
  const currentIndex = flattenedTopics.findIndex(
    (topic) => topic.id === currentTopicId
  );

  // Handlers for navigation.
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentTopicId(flattenedTopics[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < flattenedTopics.length - 1) {
      setCurrentTopicId(flattenedTopics[currentIndex + 1].id);
    }
  };

  return (
    <div className="min-h-screen my-10 flex bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-gray-50 border-gray-200 md:border-r dark:bg-gray-800 dark:border-gray-700 overflow-y-auto">
        <div className="py-6">
          {data.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <div className="px-6 py-2 text-xs font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                {section.sectionTitle}
              </div>
              <ul>
                {section.topics.map((topic) => (
                  <li key={topic.id}>
                    <button
                      onClick={() => setCurrentTopicId(topic.id)}
                      className={`flex items-center gap-2 w-full text-left px-6 py-2 text-sm transition-colors ${
                        currentTopicId === topic.id
                          ? "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-500"
                          : "hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/10 dark:hover:text-purple-500"
                      }`}
                    >
                      <span
                        className={`text-xs ${
                          currentTopicId === topic.id
                            ? ""
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        ►
                      </span>
                      {topic.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-8xl mx-auto">
        <div className="flex justify-between mb-8">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-lg font-medium border border-gray-300 hover:border-purple-500 hover:text-purple-500 dark:border-gray-600 dark:hover:border-purple-500 dark:hover:text-purple-500 transition-colors disabled:opacity-50"
          >
            « Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === flattenedTopics.length - 1}
            className="px-4 py-2 rounded-lg font-medium bg-purple-600 hover:bg-purple-700 text-white transition-colors disabled:opacity-50"
          >
            Next »
          </button>
        </div>
        <h1 className="text-5xl font-bold mb-6">{currentTopic?.title}</h1>
        {currentTopic?.topic_contents?.map((content, index) => (
          <div key={index}>
            <h2 className="text-3xl font-bold mb-6">{content.sub_heading}</h2>
            <div className="mb-6 leading-7">{content.content}</div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MinimalHTMLTutorialPage;
