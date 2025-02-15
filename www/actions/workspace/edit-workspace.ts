"use server"
import prisma from "@/lib/db"
import { auth } from "@/auth"
import { Workspace } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function EditWorkspace(workspace: Workspace) {
    const session = await auth();
    if(!session) { redirect('/') }
    try {
        const workspaceExists = await prisma.workspace.findFirst({
            where: {
                id: workspace.id
            }
        });
        if(!workspaceExists) {
            return {
                error: true,
                message: "workspace not found"
            }
        }
        const checkSlug = await prisma.workspace.findFirst({
            where: {
                slug:{
                    equals: workspace.slug,
                    mode: "insensitive"
                }
            }
        })
        if(checkSlug && workspace.slug != workspaceExists.slug) {
            return {
                error: true,
                message: "Slug Already In Use"
            }
        }
        const newworkspace = await prisma.workspace.update({
            where: {
                id: workspace.id
            },
            data: {
                name: workspace.name,
                slug: workspace.slug,
                description: workspace.description
            }
        })
        revalidatePath(`/${workspace.id}/overview`)
        return { 
            error: false,
            message: "Updated Workspace"
        }
    } catch (error) {
        console.log(error);
        return {
            error:true,
            message: error
        }
    }
}