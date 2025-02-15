"use server"
import prisma from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation";
import { Session } from "next-auth";

export async function GetWorkspaceJobs(workspaceId: string) {
    const session:Session | null = await auth();
    if(!session) { redirect('/') }
    try {
        const jobs = await prisma.workspace.findFirst({
            where: {
                id: workspaceId
            },
            select: {
                jobs: true
            }
            
        })
        return ( jobs )
    } catch (error) {
        console.error(error);
    }
}