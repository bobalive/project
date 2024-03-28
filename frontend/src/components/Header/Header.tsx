import {Button} from "../ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.tsx";
import {Package2Icon} from "../../helpers/Icons/Package2Icon.tsx";
import {UserIcon} from "../../helpers/Icons/UserIcon.tsx";
import {Login} from "../Login/Login.tsx";
import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../../interfaces/Store.interface.ts";
import {Profile} from "../Profile/Profile.tsx";
import {UserInteface} from "../../interfaces/User.interface.ts";
import {NavLink} from "react-router-dom";
import {Sidebar} from "../Sidebar/Sidebar.tsx";
import {Switch} from "../ui/switch.tsx";
import {setTheme} from "../../Store/Slices/themeSlice.ts";

import {ChangeLang} from "../ChangeLang/ChangeLang.tsx";
import {useTranslation} from "react-i18next";
import {Search} from "./Search/Search.tsx";

export const Header = () => {
    const user = useSelector<StoreInterface ,UserInteface>(state => state.user);
    const theme = useSelector<StoreInterface,{value:string}>(state => state.theme)
    const dispatch = useDispatch()
    const{t} = useTranslation()

    const setThemeValue  = ()=>{
        const el = document.querySelectorAll('html')[0]
        theme.value =='dark'?dispatch(setTheme(null)):dispatch(setTheme('dark'))
        theme.value =='dark'?el.classList.remove('dark'):el.classList.add('dark')
    }
    console.log(user)



    return (
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <NavLink className="lg:hidden flex items-center gap-2 font-semibold" to="/">
                        <Package2Icon className="h-6 w-6"/>
                        <span>{t('header.course_project')}</span>
                    </NavLink>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Sidebar></Sidebar>
                </DropdownMenuContent>

            </DropdownMenu>
            <Search/>
            <ChangeLang className={'hidden lg:block'}/>
            <Switch onClick={setThemeValue} checked={theme.value == 'dark'}/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                        size="icon"
                        variant="ghost"
                    >
                        <UserIcon className="h-4 w-4"/>
                        <span className="sr-only">{t('header.toggle_user_menu')}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                    {user.name !== '' && user.status !='blocked' ? (
                        <Profile id={user._id} name={user.name} email={user.email}/>
                    ) : (
                        <Login/>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};
