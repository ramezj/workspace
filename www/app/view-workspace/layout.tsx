import type { Metadata } from "next"
import { ReactNode } from "react"

export default async function Layout({ children, params }: { children: ReactNode, params: Promise<{ workspace: string}>}) {
    return (
        <>
          {children}
        </>
    )
}