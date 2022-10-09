import { AiFillDashboard } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
import { signOut } from "next-auth/react"

export default function Sidebar() {

    if(typeof window !== 'undefined') {
        console.log()
    }

    return (
        <div className="flex flex-col gap-5 items-center w-[3.5vw] h-screen bg-stone-900 fixed text-white">
            <AiFillDashboard className="mt-5 text-[5vh] hover:text-orange-600 cursor-pointer" onClick={() => location.href.split("/")[3] == "" ? "" : location.href = "/"}/>
            <GoSignOut className="absolute text-[5vh] mt-[93vh] hover:text-orange-600 cursor-pointer" onClick={(e) => signOut()}/>
        </div>
    )
}