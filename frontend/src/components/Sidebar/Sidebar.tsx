import {Package2Icon} from "../../helpers/Icons/Package2Icon.tsx";
import {PackageIcon} from "../../helpers/Icons/PackageIcon.tsx";
import {NavLink} from "react-router-dom";
import {Hash, LucideComputer} from "lucide-react";
import {useSelector} from "react-redux";
import {StoreInterface} from "../../interfaces/Store.interface.ts";
import {useTranslation} from "react-i18next";
import {ChangeLang} from "../ChangeLang/ChangeLang.tsx";


export const Sidebar = () => {
    const user = useSelector((store: StoreInterface) => store.user)
    const { t } = useTranslation(); // Initialize the useTranslation hook

    // Use the translations in your component
    return (
        <div className="flex h-full max-h-screen flex-col gap-2 ">
            <div className="flex h-[60px] items-center border-b px-6">
                <NavLink className="flex items-center gap-2 font-semibold" to="/">
                    <Package2Icon className="h-6 w-6"/>
                    <span className="">{t('sidebar.course_project')}</span>
                </NavLink>
            </div>
            <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                    <NavLink
                        className={({isActive}) => [isActive ? "dark:bg-gray-800 " : "dark:text-gray-400", "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:hover:text-gray-50"

                        ].join(" ")}
                        to="/">
                        <PackageIcon className="h-4 w-4"/>
                        {t('sidebar.top_collections')}
                    </NavLink>
                    <NavLink
                        className={({isActive}) => [isActive ? "dark:bg-gray-800 " : "dark:text-gray-400", "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:hover:text-gray-50"

                        ].join(" ")} to="recent-items">
                        <Package2Icon className="h-4 w-4"/>
                        {t('sidebar.recent_items')}
                    </NavLink>
                    <NavLink
                        className={({isActive}) => [isActive ? "dark:bg-gray-800 " : "dark:text-gray-400", "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:hover:text-gray-50"].join(" ")}
                        to="tag-cloud"

                    >
                        <Hash className="h-4 w-4"/>
                        {t('sidebar.tag_cloud')}
                    </NavLink>
                    {user._id && <>
                        <span className="px-3 mt-5 mb-2">{t('sidebar.course_project')}</span>
                        <NavLink
                            className={({isActive}) => [isActive ? "dark:bg-gray-800 " : "dark:text-gray-400", "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:hover:text-gray-50"].join(" ")}
                            to="my-collections">
                            <Package2Icon className="h-4 w-4"/>
                            {t('sidebar.my_collections')}
                        </NavLink>
                        {user.status == 'active' && user.role == 'admin' && <NavLink
                            className={({isActive}) => [isActive ? "dark:bg-gray-800 " : "dark:text-gray-400", "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:hover:text-gray-50"].join(" ")}
                            to="admin">
                            <LucideComputer className="h-4 w-4"/>
                            {t('sidebar.admin_panel')}
                        </NavLink>}
                    </>

                    }
                    <ChangeLang className={'lg:hidden'}/>
                </nav>
            </div>

        </div>
    );
};