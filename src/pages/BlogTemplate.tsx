import { useLocation, useNavigate } from "react-router-dom";

const BlogTemplate = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { title, created_at, content } = state;

  return (
    <div className="min-h-screen py-20 px-3">
      <div className=" mx-5">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className=" px-4 py-2 rounded-lg font-medium border border-gray-300 hover:border-blue-500 hover:text-blue-500 dark:border-gray-600 dark:hover:border-blue-500 dark:hover:text-blue-500 transition-colors disabled:opacity-50"
          >
            Back
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            created at : {new Date(created_at).toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div
          className="prose dark:prose-dark"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default BlogTemplate;
