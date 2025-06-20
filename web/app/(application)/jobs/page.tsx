import { auth } from "@/lib/auth";
import { Session } from "@/lib/auth-client";
import { redirect } from "next/navigation";
// import { Job } from "@prisma/client";
import { GetOrganizationJobs } from "@/actions/jobs/get-all-jobs";
import CreateJob from "@/components/create-job";
import { JobCardForDashboard } from "@/components/cards/job";
import { Job } from "@prisma/client";
import { headers } from "next/headers";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Jobs",
    description: "Jobs"
}

export default async function Page() {
    const session:Session | null = await auth.api.getSession({
        headers: await headers()
    });
    if(!session) { 
        redirect('/')
    }
    if(session.user.currentOrganizationId === null) {
        redirect('/dashboard');
    }
    const jobs = await GetOrganizationJobs(session.user.currentOrganizationId!);
    if(jobs?.error) {
        redirect('/');
    }
    return (
        <>
            { jobs?.jobs?.jobs.length === 0 
            ?
            <>
            <div className="flex items-center justify-between w-full">
            <h1 className="font-extrabold text-4xl text-white tracking-tight">Jobs</h1>
            <CreateJob id={session.user.currentOrganizationId!}/>
            </div>
            <div className="w-full border border-white/20 bg-black h-full rounded-md items-center flex flex-col gap-3 justify-center shadow-[0_4px_0_0_rgba(0,0,0,1)]">
                <div>
                <h1 className="font-extrabold text-white text-xl text-center">You don't have any jobs yet</h1>
                <p className="text-white font-medium text-md">create some jobs & start hiring immediately</p>
                </div>
                <CreateJob id={session.user.currentOrganizationId!}/>
            </div>
            </>
            : 
            <>
             <div className="flex justify-between items-center w-full">
                <h1 className="font-extrabold text-4xl text-white tracking-tight">Jobs</h1>
                <CreateJob id={session.user.currentOrganizationId!}/>
                </div>
                <div className="gap-5 flex flex-col">
                {
                jobs?.jobs?.jobs.map((job:Job) => {
                    return (
                    <div className="relative" key={job.id}>
                    <JobCardForDashboard job={job}/>
                    </div>
                    )
                })
                }
                </div>
            </>
            }
        </>
    )
}