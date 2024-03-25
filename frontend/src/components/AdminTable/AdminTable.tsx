import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {Link} from "react-router-dom";
import {Input} from "../ui/input.tsx";
import {AdminTablePropsInterface} from "./AdminTable.props.interface.ts";
import {useTranslation} from "react-i18next";

export const AdminTable = ({users,setIds,ids}:AdminTablePropsInterface)=>{

    const {t} = useTranslation()
    const handleChange = (id:string)=>{
        if(ids.includes(id)){
            setIds(ids.filter(prevId=> prevId != id))
        }else{
            setIds([...ids,id])
        }
    }
    const handleSelectAll = ()=>{
        if(users.length > ids.length){
            setIds(users.map(user=> user._id))
        }else{
            setIds([])
        }
    }
    console.log(ids )
    return (
        <div className="border shadow-sm rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-4'>
                            <Input type="checkbox" className=' w-4 h-4' onChange={handleSelectAll}
                                   checked={users.length === ids.length}/>
                        </TableHead>
                        <TableHead className="w-[150px]">{t('admin_table.id')}</TableHead>
                        <TableHead className="w-[150px]">{t('admin_table.name')}</TableHead>
                        <TableHead className="w-[150px]">{t('admin_table.email')}</TableHead>
                        <TableHead className="w-[150px]">{t('admin_table.role')}</TableHead>
                        <TableHead className="w-[150px]">{t('admin_table.status')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map(user => (
                        <TableRow>
                            <TableCell className='w-4'>
                                <Input type='checkbox' className='w-4 h-4' onChange={() => handleChange(user._id)}
                                       checked={ids.includes(user._id)}/>
                            </TableCell>
                            <TableCell>
                                <Link className="font-semibold" to="#">
                                    {user._id}
                                </Link>
                            </TableCell>
                            <TableCell className="text-sm">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}