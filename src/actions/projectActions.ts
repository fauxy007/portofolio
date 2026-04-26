"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid image URL"),
  techStack: z.array(z.string()).min(1, "At least one tech stack item is required"),
  liveUrl: z.string().url().optional().or(z.literal("")),
  repoUrl: z.string().url().optional().or(z.literal("")),
});

export async function createProject(data: z.infer<typeof projectSchema>) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const validated = projectSchema.parse(data);

  try {
    await db.insert(projects).values({
      ...validated,
      liveUrl: validated.liveUrl || null,
      repoUrl: validated.repoUrl || null,
    });
    revalidatePath("/");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(id: string, data: z.infer<typeof projectSchema>) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const validated = projectSchema.parse(data);

  try {
    await db
      .update(projects)
      .set({
        ...validated,
        liveUrl: validated.liveUrl || null,
        repoUrl: validated.repoUrl || null,
      })
      .where(eq(projects.id, id));
    
    revalidatePath("/");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to update project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  try {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath("/");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
