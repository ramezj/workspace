import { GetOrganization } from "@/actions/organization/organization";
import { redirect } from "next/navigation";
// import { CreateUserInvitation } from "@/components/create-invitation";
import { SettingsCard } from "@/components/cards/settings";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteOrganizationCard } from "@/components/cards/delete-org";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { Session } from "@/lib/auth-client";
import { headers } from "next/headers";

export const metadata:Metadata = {
    title: "settings",
    description: "settings"
}

export default async function Page() {
    const session:Session | null = await auth.api.getSession({
        headers: await headers()
    })
    if(!session?.user) { 
        redirect('/')
    }
    if(session.user.currentOrganizationId === null) {
        redirect('/dashboard')
    }
    const userOrganization = await GetOrganization(session.user.currentOrganizationId!);
    if(userOrganization === null) { redirect('/') }
    if(userOrganization?.organization?.role !== "owner") {
        return (
            <>
            <div className="flex justify-between items-center w-full">
            <h1 className="font-extrabold text-4xl text-white tracking-tight">Settings</h1>
            <Button size={"sm"} className="rounded-none font-extrabold border-2 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-[0_0px_0_0_rgba(0,0,0,1)] active:translate-y-1 transition-all">
                <Settings className="size-4" />
            </Button>
            </div>
            <p className="text-muted-foreground font-semibold">Restricted access</p>
            </>
        )
    }
    return (
        <>
        <div className="flex justify-between items-center w-full">
        <h1 className="font-extrabold text-4xl text-white tracking-tight">Settings</h1>
        <Button size={"sm"} variant={"outline"} className="bg-theme font-extrabold border border-white/20">
            <Settings className="size-4" />
        </Button>
        </div>
        <div className="space-y-4">
        <SettingsCard organization={userOrganization.organization.organization} />
        <DeleteOrganizationCard organizationId={session.user.currentOrganizationId!} />
        </div>
        </>
    )
}