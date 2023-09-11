import { OrganizationSwitcher, SignedIn, SignedOut } from "@clerk/nextjs";
import { Organization } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

function Topbar(){
    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4">
                <Image src="/assets/logo-no-background.svg" alt="logo" width={42} height={42} />
            </Link>
            <div className= "flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignedOut>
                            <div className="flex cursor-pointer">
                                <Image 
                                    src="/assets/logout.svg"
                                    alt="logout"
                                    width={24}
                                    height={24}
                                />    
                            </div>
                        </SignedOut>
                    </SignedIn>
                </div>
                <OrganizationSwitcher
                appearance={{
                    elements: {
                        organizationSwitcherTrigger: "py-2 px-4",
                    },
                }}/>
            </div>
        </nav>
    )
}

export default Topbar;