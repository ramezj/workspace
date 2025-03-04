"use server"
import { GetWorkspace } from "@/actions/workspace/workspace"
import { redirect } from "next/navigation";
import { CreateUserInvitation } from "@/components/create-invitation";
import { SettingsCard } from "@/components/cards/settings";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRole } from "@/lib/format-role";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ManageMember } from "@/components/manage-member";
import { Session } from "next-auth";
import { auth } from "@/auth";
import { Prisma, WorkspaceUser } from "@prisma/client";

type WorkspaceUserWithUser = Prisma.WorkspaceUserGetPayload<{
    include: {
        user: true
    }
}>

export default async function Page({ params } : { params: Promise<{ workspace: string }>}) {
    const session:Session | null = await auth();
    if(!session) { redirect('/') }
    const userWorkspace = await GetWorkspace((await params).workspace);
    if(userWorkspace === null) { redirect('/') }
    if(userWorkspace?.role !== "owner") {
        return (
            <>
             <div className="flex justify-between items-center w-full">
            <h1 className="font-bold text-3xl tracking-tight">Team Members</h1>
            <Button size={"sm"}>
                <Users className="size-4" />
            </Button>
            </div>
            <p className="text-muted-foreground font-semibold">Restricted Access</p>
            </>
        )
    }
    return (
        <>
        <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-3xl tracking-tight">Team Members</h1>
        <Button size={"sm"}>
            <Users className="size-4" />
        </Button>
        </div>
        <Card className="bg-background">
        <CardHeader>
            <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            {
                userWorkspace.workspace.users.map((users: WorkspaceUserWithUser) => {
                    return (
                        <div className="flex items-center justify-between" key={users.user.id}>
                        <div className="flex items-center space-x-4" key={users.user.id}>
                        <Avatar>
                        <AvatarImage src={users.user.image!} />
                        <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        <div>
                        <p className="text-sm font-medium leading-none">{users.user.name}</p>
                        <p className="text-sm text-muted-foreground">{formatRole(users.role)}</p>
                        </div>
                        </div>
                        {
                            session.user?.id === users.userId 
                            ? 
                            <>
                            </>
                            :
                            <>
                            <ManageMember WorkspaceUser={users} />
                            </>
                        }
                        </div>
                    )
                })
            }
        </CardContent>
        </Card>
        <div>
        <CreateUserInvitation workspaceId={userWorkspace.workspaceId} />
        </div> 
        </>
    )
}