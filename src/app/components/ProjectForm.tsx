"use client";

import { useState } from "react";
import { createProject, updateProject } from "@/actions/projectActions";
import { useRouter } from "next/navigation";

interface ProjectFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    techStack: string[];
    liveUrl: string | null;
    repoUrl: string | null;
  };
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [techStack, setTechStack] = useState(initialData?.techStack?.join(", ") || "");
  const [liveUrl, setLiveUrl] = useState(initialData?.liveUrl || "");
  const [repoUrl, setRepoUrl] = useState(initialData?.repoUrl || "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      title,
      description,
      imageUrl,
      techStack: techStack.split(",").map((s) => s.trim()).filter(Boolean),
      liveUrl: liveUrl || undefined,
      repoUrl: repoUrl || undefined,
    };

    try {
      let result;
      if (initialData?.id) {
        result = await updateProject(initialData.id, data);
      } else {
        result = await createProject(data);
      }

      if (result.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(result.error || "An error occurred");
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong. Please check your inputs.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 p-8 rounded-xl border border-zinc-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Project Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="E.g. E-commerce Platform"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Image URL</label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Tech Stack (comma separated)</label>
            <input
              type="text"
              required
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Next.js, TypeScript, Tailwind CSS"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Live URL (optional)</label>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Repo URL (optional)</label>
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="https://github.com/..."
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
        <textarea
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          placeholder="Describe your project..."
        />
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-900/30 text-red-400 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
  );
}
