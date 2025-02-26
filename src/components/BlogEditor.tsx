import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import { Send, X } from "lucide-react";
import { supabase } from "../lib/supabase";
import { BlogPost, BlogTag } from "../types/blog";

interface BlogEditorProps {
  post?: BlogPost;
  onSave: (post: Partial<BlogPost>) => Promise<void>;
  onCancel: () => void;
}

export default function BlogEditor({
  post,
  onSave,
  onCancel,
}: BlogEditorProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [selectedTags, setSelectedTags] = useState<BlogTag[]>(post?.tags || []);
  const [availableTags, setAvailableTags] = useState<BlogTag[]>([]);
  const [saving, setSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setContent(newContent);
      handleAutoSave(newContent);
    },
  });

  useEffect(() => {
    const fetchTags = async () => {
      const { data: tags, error } = await supabase
        .from("blog_tags")
        .select("*")
        .order("name");

      if (!error && tags) {
        setAvailableTags(tags);
      }
    };

    fetchTags();
  }, []);

  // Auto-save functionality
  const handleAutoSave = debounce(async (newContent: string) => {
    if (!post?.id) return;

    try {
      setAutoSaveStatus("Saving...");
      await onSave({
        id: post.id,
        title,
        content: newContent,
        status: "draft",
      });
      setAutoSaveStatus("Saved");
    } catch (error) {
      setAutoSaveStatus("Failed to save");
    }
  }, 2000);

  const handlePublish = async () => {
    try {
      setSaving(true);
      await onSave({
        title,
        content,
        status: "published",
        published_at: new Date().toISOString(),
        tags: selectedTags,
      });
    } finally {
      setSaving(false);
    }
  };

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="text-3xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 w-full"
        />
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{autoSaveStatus}</span>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Send className="w-4 h-4" />
            Publish
          </button>
          <button
            onClick={onCancel}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1"
            >
              {tag.name}
              <button
                onClick={() =>
                  setSelectedTags((tags) => tags.filter((t) => t.id !== tag.id))
                }
                className="w-4 h-4 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
          <select
            onChange={(e) => {
              const tag = availableTags.find((t) => t.id === e.target.value);
              if (tag && !selectedTags.find((t) => t.id === tag.id)) {
                setSelectedTags([...selectedTags, tag]);
              }
            }}
            className="px-3 py-1 bg-transparent border border-gray-300 dark:border-gray-700 rounded-full text-sm"
          >
            <option value="">Add tag...</option>
            {availableTags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

// Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
