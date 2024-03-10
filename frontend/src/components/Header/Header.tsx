import {Input} from "../ui/input.tsx";
import {Button} from "../ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.tsx";
import {Package2Icon} from "../../helpers/Icons/Package2Icon.tsx";
import {UserIcon} from "../../helpers/Icons/UserIcon.tsx";
import {SearchIcon} from "../../helpers/Icons/SearchIcon.tsx";
import {PlusIcon} from "../../helpers/Icons/PlusIcon.tsx";
import {Login} from "../Login/Login.tsx";


export const Header = ()=>{
    return (
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <a className="lg:hidden flex items-center gap-2 font-semibold" href="#">
                <Package2Icon className="h-6 w-6"/>
                <span className="">Collections</span>
            </a>
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"/>
                        <Input
                            className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950 dark:text-white"
                            placeholder="Search collections..."
                            type="search"
                        />
                    </div>
                </form>
            </div>
            <Button className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800" size="icon">
                <PlusIcon className="h-4 w-4"/>
                <span className="sr-only">New collection</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                        size="icon"
                        variant="ghost"
                    >
                        <UserIcon className="h-4 w-4"/>
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                    <Login/>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}