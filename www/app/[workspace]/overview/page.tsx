"use server"
import { GetWorkspace } from "@/actions/workspace/workspace"
import { redirect } from "next/navigation";
import { Stats } from "@/components/stats";
import { Session } from "next-auth";
import { auth } from "@/auth";

export default async function Page({ params } : { params: Promise<{ workspace: string }>}) {
    const session:Session | null = await auth();
    if(!session) { return redirect('/') }
    const userWorkspace = await GetWorkspace((await params).workspace);
    if(userWorkspace === null) { redirect('/') }
    return (
        <main className="p-2">
        <h1 className="font-bold text-3xl">Overview</h1>
        {/* {JSON.stringify(userWorkspace?.workspace)} */}
        <div className="flex sm:flex-row flex-col gap-2 w-full mt-4">
        <Stats title="Total Jobs" amount={10}/>
        <Stats title="Total Applicants" amount={57}/>
        </div>
        </main>
    )
}