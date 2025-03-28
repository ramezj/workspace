"use server"
import { GetWorkspace } from "@/actions/workspace/workspace"
import { redirect } from "next/navigation";
import { CreateUserInvitation } from "@/components/create-invitation";
import { SettingsCard } from "@/components/cards/settings";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function Page({ params } : { params: Promise<{ workspace: string }>}) {
    const userWorkspace = await GetWorkspace((await params).workspace);
    if(userWorkspace === null) { redirect('/') }
    if(userWorkspace?.role !== "owner") {
        return (
            <>
            <div className="flex justify-between items-center w-full">
            <h1 className="font-bold text-3xl tracking-tight">Settings</h1>
            <Button size={"sm"}>
                <Settings className="size-4" />
            </Button>
            </div>
            <p className="text-muted-foreground font-semibold">Restricted Access</p>
            </>
        )
    }
    return (
        <>
        <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-3xl tracking-tight">Settings</h1>
        <Button size={"sm"}>
            <Settings className="size-4" />
        </Button>
        </div>
        <div className="">
        <SettingsCard workspace={userWorkspace.workspace} />
        </div>
        {/* <div className="mt-4">
        <h1 className="font-bold text-3xl tracking-tighter">Team Members</h1>
        </div>
        <div>
            {userWorkspace.workspace.users.map((users) => {
                return (
                    <div key={users.user.id}>
                    <p className="">{users.user.name}</p>
                    <p className="text-muted-foreground">{users.user.email}</p>
                    <p className="text-muted-foreground">{users.role}</p>
                    </div>
                )
            })}
        </div>
        <div className="mt-2">
        <CreateUserInvitation workspaceId={userWorkspace.workspaceId} />
        </div>  */}
        </>
    )
}