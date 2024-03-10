import {Package2Icon} from "../../helpers/Icons/Package2Icon.tsx";
import {PackageIcon} from "../../helpers/Icons/PackageIcon.tsx";
import {useState} from "react"
import {NavLink} from "react-router-dom";



export const Sidebar = ()=>{
    const [activeTab , setActiveTab] = useState(0)
    return (
        <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
                <NavLink className="flex items-center gap-2 font-semibold" to="/">
                    <Package2Icon className="h-6 w-6"/>
                    <span className="">Course project</span>
                </NavLink>
            </div>
            <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                    <a
                        className={(activeTab == 0 ? "bg-gray-100 ":' text-gray-500 ')+ "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"}
                        href="#"
                        onClick={()=>setActiveTab(0)}
                    >
                        <PackageIcon className="h-4 w-4"/>
                        Collections
                    </a>
                    <a
                        className={(activeTab == 1 ? "bg-gray-100 ":'text-gray-500 ')+"flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"}
                        href="#"
                        onClick={()=>setActiveTab(1)}
                    >
                        <Package2Icon className="h-4 w-4"/>
                        My Collection
                    </a>
                </nav>
            </div>

        </div>
    )
}