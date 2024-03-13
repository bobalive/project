import {Package2Icon} from "../../helpers/Icons/Package2Icon.tsx";
import {PackageIcon} from "../../helpers/Icons/PackageIcon.tsx";
import {useState} from "react"
import {NavLink} from "react-router-dom";
import {Hash} from "lucide-react";



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
                        className={(activeTab == 0 ? "dark:bg-gray-800 " : ' dark:text-gray-400 ') + "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50"}
                        href="#"
                        onClick={() => setActiveTab(0)}
                    >
                        <PackageIcon className="h-4 w-4"/>
                        Top collections
                    </a>
                    <a
                        className={(activeTab == 1 ? "dark:bg-gray-800 " : 'dark:text-gray-400 ') + "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:hover:text-gray-50"}
                        href="#"
                        onClick={() => setActiveTab(1)}
                    >
                        <Package2Icon className="h-4 w-4"/>
                        Resent items
                    </a>
                    <a
                        className={(activeTab == 2 ? "dark:bg-gray-800 " : 'dark:text-gray-400 ') + "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:hover:text-gray-50"}
                        href="#"
                        onClick={() => setActiveTab(2)}
                    >
                        <Hash className="h-4 w-4"/>
                        Tag Cloud
                    </a>

                    <span className="px-3 mt-5 mb-2">Course project</span>
                    <a
                        className={(activeTab == 3 ? "dark:bg-gray-800 " : 'dark:text-gray-400 ') + "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:hover:text-gray-50"}
                        href="#"
                        onClick={() => setActiveTab(3)}
                    >
                        <Package2Icon className="h-4 w-4"/>
                        My collections
                    </a>
                </nav>
            </div>

        </div>
    )
}