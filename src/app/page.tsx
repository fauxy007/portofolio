import Hero from "@/app/components/hero";
import About from "@/app/components/about";
import Projects from "@/app/components/projects";
import Footer from "@/app/components/footer";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function Home() {
  const allProjects = await db.query.projects.findMany({
    orderBy: [desc(projects.createdAt)],
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <Hero />
      <About />
      <Projects projects={allProjects} />
      <Footer />
    </main>
  );
}
