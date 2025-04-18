"use client"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import Balancer from "react-wrap-balancer"
import { DeleteOrganization } from "@/actions/organization/delete-organization"
import { useState } from "react"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { Loader2 } from "lucide-react"

export function DeleteOrganizationCard({ organizationId } : { organizationId: string }) {
    const [ loading, setLoading ] = useState<boolean>(false);
    const deleteOrg = async (e: React.FormEvent, organizationId: string) => {
        e.preventDefault();
        setLoading(true);
        const res = await DeleteOrganization(organizationId);
        if(res?.error) {
            toast(res.message);
        } else {
            setLoading(false);
            redirect('/dashboard')
        }
    }
    return (
        <Card className="w-full bg-white rounded-none border">
        <CardHeader>
            <CardTitle className='font-extrabold text-black'>delete organization</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className='font-bold text-black w-fit sm:text-base text-sm'>
                are you sure you want to delete this organization?
            </h1>
            {
                loading
                ? 
                <Button variant={"destructive"} disabled className='font-bold rounded-none' onClick={((e) => {deleteOrg(e, organizationId)})}>
                <Loader2 className="size-4 mr-2 animate-spin" />
                delete organization
                </Button>
                :
                <>
                <Button variant={"destructive"} className='font-bold rounded-none' onClick={((e) => {deleteOrg(e, organizationId)})}>
                delete organization
                </Button>
                </>
            }
        </CardContent>
        </Card>
    )
}