import {SearchIcon} from "../../../helpers/Icons/SearchIcon.tsx";
import {Input} from "../../ui/input.tsx";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {autocomplete} from "../../../api/search.api.ts";
import {NavLink, useNavigate} from "react-router-dom";

interface OptionsInterface  {
    _id:string
    name:string,
    tags:string[]
}
export const Search = ()=>{
    const {t} = useTranslation()

    const [options , setOptions] = useState<OptionsInterface[]>()
    const [value , setValue] = useState('')

    const navigate = useNavigate()
    useEffect(() => {
        const timeOut = setTimeout(()=>{
            autocomplete(value).then((res)=>{
                setOptions(res)
            })
        },500)

        if(value == ''){
            setOptions(undefined)
        }
        return ()=>{
            clearTimeout(timeOut)
        }
    }, [value]);

    console.log(options)

    return (
            <form className="flex-1 relative z-10" onSubmit={(e)=> {
                navigate('search/'+value)
                e.preventDefault()
                setValue('')
            }}>
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"/>
                    <Input
                        className="bg-white shadow-none appearance-none pl-8 dark:bg-gray-950 dark:text-white  "
                        placeholder={t('header.search_collections')}
                        type="searchControler"
                        value={value}
                        onChange={(e)=> setValue(e.target.value)}
                        onBlur={()=> setTimeout(()=> {
                            setValue('')
                        },1000)}
                    />
                <div className={'absolute dark:bg-gray-950 dark:text-white p-3 w-full border transition-all gap-2 ' + (!value&& 'hidden')}>
                    {(options&& options?.length>0)
                        ?options.map(item=>(
                            <NavLink to={'/item/'+item._id} className='border w-full p-2 text-center block hover:bg-gray-600 z-10'>Item:{item.name||'nothing found'}</NavLink>
                    ))
                    : <div className='border w-full p-2 text-center block z-10'>Nothing Found</div>
                    }

                </div>
            </form>
    )
}