import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { deleteProject } from "@/actions/projectActions";

export default async function DashboardPage() {
  const allProjects = await db.query.projects.findMany({
    orderBy: [desc(projects.createdAt)],
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-zinc-400">Manage your portfolio works</p>
        </div>
        <Link
          href="/dashboard/new"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
        >
          Add New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProjects.map((project) => (
          <div
            key={project.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col group hover:border-zinc-700 transition-colors"
          >
            <div className="aspect-video relative overflow-hidden bg-zinc-800">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-600">No Image</div>
              )}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-zinc-400 text-sm line-clamp-2 mb-4 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded border border-zinc-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/dashboard/edit/${project.id}`}
                  className="flex-1 text-center py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm font-medium transition-colors border border-zinc-700"
                >
                  Edit
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await deleteProject(project.id);
                  }}
                  className="flex-1"
                >
                  <button
                    type="submit"
                    className="w-full py-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/30 rounded-md text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}

        {allProjects.length === 0 && (
          <div className="col-span-full py-20 text-center bg-zinc-900/50 rounded-xl border-2 border-dashed border-zinc-800">
            <p className="text-zinc-500 mb-4">No projects found. Add your first one!</p>
            <Link
              href="/dashboard/new"
              className="text-blue-400 hover:underline"
            >
              Get started →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
