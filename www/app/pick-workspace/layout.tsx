import type { Metadata } from "next"
import { ReactNode } from "react"

export const metadata:Metadata ={
    title:"Pick a Workspace",
    description:"Workspace Overview"
}

export default async function Layout({ children, params }: { children: ReactNode, params: Promise<{ workspace: string}>}) {
    return (
        <>
          {children}
        </>
    )
}