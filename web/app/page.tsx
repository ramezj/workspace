import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Navbar } from "@/components/navbar-2";
import Link from "next/link";
import { Metadata } from "next";
import { LandingPageJobCard } from "@/components/cards/job";
import FeatureCards from "@/components/test-cards";
import { CustomButton } from "@/components/ui/custom-buttons";
import Marquee from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";

export const metadata:Metadata = {
  title: "wegotwork",
  description: "hiring just got easier."
}

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const items = ['wegotwork', 'start hiring', 'wegotwork', 'start hiring', 'wegotwork', 'start hiring', 'wegotwork', 'start hiring', 'wegotwork']
  return (
    <main className="">
      <Navbar session={session}/>
      <div>
      <div className="flex flex-col items-center text-center mt-12 px-2">
      <h1 className="sm:text-7xl text-5xl font-black text-white">
        {/* Hiring just got easier. */}
        Build Beautiful Career Pages
      </h1>
      <h3 className="sm:text-lg text-sm mt-2 font-bold text-balance text-white">
        Build beautiful career pages, create jobs, receive applicants, all in one place.
      </h3>
      </div>
      <div className="flex flex-col items-center p-4 -mt-4">
      <div className="flex flex-row w-full sm:w-1/2 items-center justify-center content-center gap-4 mt-6">
            {/* <CustomButton asChild variant={"default"} className="font-extrabold w-full rounded-none bg-white text-black border-2 border-black hover:bg-white transition-all hover:shadow-[0_0px_0_0_rgba(0,0,0,1)] hover:translate-y-1">
                <Link href='/auth'>
                Start Hiring
                </Link>
            </CustomButton> */}
            <Button asChild variant={"outline"} className="px-4 bg-theme w-full rounded-none font-bold">
              <Link href='/auth'>
              Start Hiring
              </Link>
              </Button>
            <Button variant={"default"} asChild className="px-4 w-full rounded-none font-bold">
              <Link href={`http://demo.${process.env.NEXT_PUBLIC_URL}`} target="_blank">
              See Demo
              </Link>
            </Button>
            {/* <CustomButton asChild className="font-extrabold w-full rounded-none bg-white text-black border-2 border-black hover:bg-white transition-all hover:shadow-[0_0px_0_0_rgba(0,0,0,1)] hover:translate-y-1" variant={"default"}>
                <Link target="_blank" href={`http://demo.${process.env.NEXT_PUBLIC_URL}`}>
                See Demo
                </Link>
            </CustomButton> */}
      </div>
      <div className="not-prose my-8 lg:w-1/2 w-full space-y-4">
            <LandingPageJobCard title="Operations Manager" type="Full-Time" location="Cairo, EG" age="about 1 month ago" />
            <LandingPageJobCard title="Backend Engineer" type="Full-Time" location="Cairo, EG" age="about 1 month ago" />
      </div>
      </div>
      {/* <div className="not-prose my-8 lg:w-1/2 w-full space-y-4 border border-white/20 flex items-center content-center">
        <img
        className="border-2 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)]"
        src="/dashboard.png"
        alt="Photo by Drew Beamer"
        />
      </div> */}
      {/* <div className="pb-5">
      <Marquee items={items} />
      </div> */}

      {/* <div className="content-center items-center justify-center flex px-4">
      <div className="not-prose lg:w-1/2 w-full overflow-hidden space-y-4">
      <FeatureCards />
      </div>
      </div> */}
      </div>
    </main>
  );
}
