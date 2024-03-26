import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {useTranslation} from "react-i18next";

interface ChangeLangInterface{
    className?:string
}
export const ChangeLang = ({className}:ChangeLangInterface)=>{
    const {i18n} = useTranslation()
    const handleChange = (e:string)=>{
        i18n.changeLanguage(e)
    }
    return(
        <div className={'w-[150px] '+className}>
        <Select onValueChange={handleChange} >
            <SelectTrigger>
                <SelectValue placeholder="en" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">en</SelectItem>
                <SelectItem value="ru">ru</SelectItem>
            </SelectContent>
        </Select>
        </div>
    )
}