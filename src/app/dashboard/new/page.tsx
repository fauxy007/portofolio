import ProjectForm from "@/app/components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Add New Project</h1>
        <p className="text-zinc-400">Create a new entry for your portfolio</p>
      </div>
      <ProjectForm />
    </div>
  );
}
