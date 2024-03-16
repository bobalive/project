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

import {Login} from "../Login/Login.tsx";
import {useSelector} from "react-redux";
import {StoreInterface} from "../../interfaces/Store.interface.ts";
import {Profile} from "../Profile/Profile.tsx";
import {UserInteface} from "../../interfaces/User.interface.ts";
import {NavLink} from "react-router-dom";
import {Sidebar} from "../Sidebar/Sidebar.tsx";


export const Header = () => {
    const user = useSelector<StoreInterface ,UserInteface>(state => state.user);

    return (
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <NavLink className="lg:hidden flex items-center gap-2 font-semibold" to="/">
                        <Package2Icon className="h-6 w-6"/>
                        <span>Course project</span>
                    </NavLink>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Sidebar></Sidebar>
                </DropdownMenuContent>

            </DropdownMenu>
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
                    {user.name !== '' ? (
                        <Profile id={user.id} name={user.name} email={user.email} />
                    ) : (
                        <Login />
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};
