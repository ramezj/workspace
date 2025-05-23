"use client"
import { Loader2 } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Organization } from "@prisma/client"
import { useState } from "react"
import { EditOrganization } from "@/actions/organization/edit-organization"
import { toast } from "sonner"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card"
import { Textarea } from "../ui/textarea"

export function SettingsCard({ organization } : { organization: Organization}) {
    const [ current, setCurrent ] = useState<Organization>(organization);
    const [ loading, setLoading ] = useState<boolean>(false);
    const editOrganization = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const res = await EditOrganization(current);
        toast(
            <div className="font-bold">
                <h1 className="font-bold">{res.message as string}</h1>
            </div>
        );
        setLoading(false);
    }
    return (
        <Card className="w-full bg-white rounded-none border-black border-2 shadow-[0_4px_0_0_rgba(0,0,0,1)]">
            <CardHeader>
                <CardTitle className="text-black font-extrabold">
                    Organization
                </CardTitle>
            </CardHeader>
        <CardContent>
        <form onSubmit={editOrganization} className="space-y-4">
        <div className="space-y-2">
        <Label className='font-extrabold text-black'>Name</Label>
        <Input className="bg-white border-2 border-black rounded-none font-medium text-black text-base" required placeholder="Enter name" value={current.name} onChange={((e) => { setCurrent((previous) => ({...previous, name: e.target.value}))})}></Input>
        </div>
        <div className="space-y-2">
        <Label className='font-extrabold text-black'>Slug</Label>
        <Input className="bg-white border-2 border-black rounded-none font-medium text-black text-base" required placeholder="Enter slug" value={current.slug} onChange={
            ((e) => { 
                const newSlug = e.target.value.replace(/\s+/g, '-');
                setCurrent((previous) => ({...previous, slug: newSlug }))})
        }></Input>
        </div>
        <div className="space-y-2">
        <Label className='font-extrabold text-black'>Website</Label>
        <Input className="bg-white border-2 border-black rounded-none font-medium text-black text-base" 
        type="url"
        placeholder="Enter organization's website" 
        value={current.website === null ? "" : current.website } 
        onChange={((e) => { setCurrent((previous) => ({...previous, website: e.target.value}))})} />
        </div>
        <div className="space-y-2">
        <Label className='font-extrabold text-black'>Description</Label>
        <Textarea className="bg-white border-2 border-black rounded-none font-medium text-black text-base" placeholder="Provide a detailed organization description" value={current.description as string} onChange={((e) => { setCurrent((previous) => ({...previous, description: e.target.value}))})}></Textarea>
        </div>
        <div className="space-y-2">
        {
            loading
            ? 
            <>
            <Button type="submit" className="pointer-events-none font-extrabold !bg-[#F2EFE8] hover:bg-[#F2EFE8] active:bg-[#F2EFE8] rounded-none text-black border-2 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-[0_0px_0_0_rgba(0,0,0,1)] transition-all active:translate-y-1">
            <Loader2 className="animate-spin mr-2" />
            Save Changes
            </Button>
            </>
            :
            <>
            <Button type="submit" className="font-extrabold bg-[#F2EFE8] hover:bg-[#F2EFE8] active:bg-[#F2EFE8] rounded-none text-black border-2 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-[0_0px_0_0_rgba(0,0,0,1)] transition-all active:translate-y-1">
            Save Changes
            </Button>
            </>
        }
        </div>
        </form>
        </CardContent>
        </Card>
    )
}