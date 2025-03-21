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
import { GetJobAsOwnerWithApplicants } from "@/actions/jobs/get-job-owner";
import { EditJobCard } from "@/components/edit-job";

export const metadata:Metadata = {
    title: "applicants",
    description: "applicants"
}

export default async function Page({ params } : { params: Promise<{ organization: string, jobId: string }>}) {
    const session:Session | null = await auth.api.getSession({
        headers: await headers()
    });
    if(!session) { redirect('/')}
    const job = await GetJobAsOwnerWithApplicants((await params).jobId)
    if(job.error) {
        redirect('/')
    }
    return (
        <>
        </>
    )
}