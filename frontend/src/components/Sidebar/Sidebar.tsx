import {Package2Icon} from "../../helpers/Icons/Package2Icon.tsx";
import {PackageIcon} from "../../helpers/Icons/PackageIcon.tsx";
import {NavLink} from "react-router-dom";
import {Hash} from "lucide-react";



export const Sidebar = ()=>{


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
                    <NavLink
                        className={({ isActive }) =>
                            [
                                isActive ? "dark:bg-gray-800 " : "dark:text-gray-400",
                                "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:hover:text-gray-50"

                            ].join(" ")
                        }
                        to="/"

                    >
                        <PackageIcon className="h-4 w-4"/>
                        Top collections
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            [
                                isActive ? "dark:bg-gray-800 " : "dark:text-gray-400",
                                "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:hover:text-gray-50"

                            ].join(" ")
                        }                        to="recent-items"

                    >
                        <Package2Icon className="h-4 w-4"/>
                        Recent items
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            [
                                isActive ? "dark:bg-gray-800 " : "dark:text-gray-400",
                                "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:hover:text-gray-50"

                            ].join(" ")
                        }                        to="tag-cloud"

                    >
                        <Hash className="h-4 w-4"/>
                        Tag Cloud
                    </NavLink>

                    <span className="px-3 mt-5 mb-2">Course project</span>
                    <NavLink
                        className={({ isActive }) =>
                            [
                                isActive ? "dark:bg-gray-800 " : "dark:text-gray-400",
                                "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:hover:text-gray-50"

                            ].join(" ")
                        }                        to="my-collections"

                    >
                        <Package2Icon className="h-4 w-4"/>
                        My collections
                    </NavLink>
                </nav>
            </div>

        </div>
    )
}