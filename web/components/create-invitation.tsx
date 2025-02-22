"use client"
import React, {useState } from "react"
import { Button } from "./ui/button";
import { CreateInvitation } from "@/actions/invitations/create";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2, CheckCircle, Link, Copy, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function CreateUserInvitation({ organizationId} : { organizationId: string}) {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ invitationLink, setInvitationLink ] = useState<string | null>(null)
    const [ isCopied, setIsCopied ] = useState<boolean>(false);
    const create_the_invitation = async (e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await CreateInvitation(organizationId);
        setLoading(false);
        setInvitationLink(`${process.env.NEXT_PUBLIC_URL}/invite/${res?.invitation.id}`);
        setIsCopied(false);
    }
    const handleCopyLink = () => {
      if(invitationLink) {
        navigator.clipboard.writeText(invitationLink)
        setIsCopied(true);
      }
    }
    return (
      <>
      <Card className="w-full bg-background">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add Members</CardTitle>
      </CardHeader>
      <CardContent className="">
        <form className="flex flex-row gap-2" onSubmit={create_the_invitation}>
        <Input type="email" required placeholder="Email" />
        {
          loading
          ? 
          <>
          <Button disabled onClick={create_the_invitation} className="">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Invite Member 
          </Button>
          </>
          : 
          <>
          <Button type="submit" className="">
          {/* <Link className="mr-2 h-4 w-4" /> */}
          Invite Member
          </Button>
          </>
        }
        </form>
        {/* {invitationLink && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Invitation Link:</p>
            <div className="flex items-center space-x-2">
              <Input value={invitationLink} readOnly className="flex-grow" />
              <Button onClick={handleCopyLink} variant="outline" size="icon" className="flex-shrink-0">
                {isCopied ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )} */}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Share this link with your team members to invite them to join.
        </p>
      </CardFooter>
    </Card>
    </>
    )
}