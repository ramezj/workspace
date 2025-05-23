"use client"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"
import Link from "next/link"
import { Button } from "./ui/button"
import { ChevronsUpDown, Settings2, LogOut} from "lucide-react"
import { signOut } from "@/lib/auth-client"
import { Session } from "@/lib/auth-client"
import { Separator } from "./ui/separator"
import { redirect } from "next/navigation"

export function DropDownMenuUser({ session } : { session: Session | null }) {
  const signUserOut = async () => {
    await signOut({
      fetchOptions: {
        onError: (error) => {
          console.log(error);
        },
        onSuccess: () => {
          redirect('/');
        }
      }
     })
  }
  const redirectToDashboard = async () => {
    redirect("/dashboard");
  }
    return (
        <>
        <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="w-full bg-inherit rounded-none border-2 border-black text-black font-extrabold hover:bg-white hover:text-black p-3 shadow-[0_4px_0_0_rgba(0,0,0,1)]">
                    {session?.user?.name}
                    <ChevronsUpDown className="ml-auto size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width] bg-white border-2 border-black text-black space-y-2 rounded-none"
                >
                  <DropdownMenuItem onSelect={redirectToDashboard} className="font-extrabold cursor-pointer hover:!bg-theme hover:!text-black border-2 border-white hover:border-black !rounded-none">
                  <Settings2 className="size-4" />
                  Switch Organization
                  </DropdownMenuItem>
                  <div>
                  <Separator className="-my-1"/>
                  </div>
                  <DropdownMenuItem onClick={signUserOut} 
                  className="cursor-pointer hover:!bg-theme hover:!text-black font-extrabold border-2 border-white hover:border-black !rounded-none">
                  <LogOut className="size-4" />
                  Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}