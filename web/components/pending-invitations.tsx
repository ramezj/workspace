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
import { OrganizationInvite } from "@prisma/client";
import { formatRole } from "@/lib/format-role";

export function PendingInvitations({ OrganizationInvites } : { OrganizationInvites: OrganizationInvite[] }) {
    return (
      <>
      <Card className="w-full bg-background">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Pending Invitations</CardTitle>
      </CardHeader>
      <CardContent className="">
        {
          OrganizationInvites.length === 0 
          && 
          <>
          <p className="text-sm text-muted-foreground">No pending invitations</p>
          </>
        }
        {
            OrganizationInvites.map((Invitation) => {
                return (
                    <div className="flex items-center justify-between space-y-2" key={Invitation.id}>
                    <h1>{Invitation.email}</h1>
                    <p className="text-muted-foreground">{formatRole(Invitation.role)}</p>
                    </div>
                )
            })
        }
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
    </>
    )
}