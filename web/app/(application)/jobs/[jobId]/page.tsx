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
import { GetJobAsOwner } from "@/actions/jobs/get-job-owner";
import { EditJobCard } from "@/components/edit-job";
import { DeleteJobButton } from "@/components/delete-job";
import { Applicants, TotalApplicants } from "@/components/statistics";

export const metadata:Metadata = {
    title: "jobs",
    description: "jobs"
}

export default async function Page({ params } : { params: Promise<{ organization: string, jobId: string }>}) {
    const session:Session | null = await auth.api.getSession({
        headers: await headers()
    });
    if(!session) { 
        redirect('/')
    }
    if(session.user.currentOrganizationId === null) {
        redirect('/dashboard');
    }
    const job = await GetJobAsOwner((await params).jobId)
    if(job.error) {
        redirect('/')
    }
    return (
        <>
        <div className="flex justify-between items-center w-full">
        <h1 className="font-extrabold text-4xl text-black tracking-tight">{job.job?.title}</h1>
        <DeleteJobButton job={job.job as Job} />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
        <Applicants title="Applicants" amount={job.job?.applicants.length as number} />
        <Applicants title="Applicants" amount={job.job?.applicants.length as number} />
        </div>
        <EditJobCard job={job.job as Job} />
        </>
    )
}