import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../../../interfaces/Store.interface.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button} from "../../../components/ui/button.tsx";
import { Lock, Trash, Unlock, UserIcon, UserPlus} from "lucide-react";
import {AppDispatch, UserInteface} from "../../../interfaces/User.interface.ts";
import {changeRole, changeUserState, deleteUsers, getUsers} from "../../../api/user.api.ts";
import {AdminTable} from "../../../components/AdminTable/AdminTable.tsx";
import {useTranslation} from "react-i18next";
import {auth} from "../../../Store/Slices/userSlice.ts";


export const Admin = ()=>{
    const user = useSelector((store:StoreInterface)=> store.user)
    const navigate = useNavigate()
    const {t} = useTranslation()

    console.log(user)

    const [users,setUsers ] = useState<UserInteface[]>()
    const [ids , setIds] = useState<string[]>([])

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(auth())
    }, []);

    const handleDelete = async ()=>{
        await dispatch(auth())
        const res = await deleteUsers(ids)
        if(res){
            getUsers().then(res=>{
                setUsers(res)
            })
        }
    }
    const hadleChangeStatus = async (status:'blocked'|'active')=>{
        await dispatch(auth())
        const res = await changeUserState({ids,status})
        if(res){
            getUsers().then(res=>{
                setUsers(res)
            })
        }
    }
    const handleChangeRole = async (role:'admin'|'user')=>{
        await dispatch(auth)
        const res = await changeRole({ids,role})
        if(res){
            getUsers().then(res=>{
                setUsers(res)
            }).catch(()=>{
                setUsers([])
            })
        }
    }

    useEffect(() => {
        if(user.role != "admin" || user.status != "active" || !user._id){
            navigate('/')
        }
        getUsers().then(res=>{
            setUsers(res)
        }).catch(()=>{
            setUsers([])
        })
    }, [user]);

    return(
        <>
            <div className="flex justify-between flex-col  ">
                <h1 className="text-3xl font-bold tracking-tight my-1.5">{t('admin_panel')}:</h1>
                <div className='flex gap-1 flex-wrap'>
                    <Button size='lg' onClick={async ()=> await hadleChangeStatus('blocked')}>
                        <Lock/>
                    </Button>
                    <Button size='lg' onClick={async ()=> await hadleChangeStatus('active')}>
                        <Unlock/>
                    </Button>
                    <Button size='lg' onClick={async ()=> await handleChangeRole('admin')}>
                        <UserPlus/>
                    </Button>
                    <Button size='lg' onClick={async ()=> await handleChangeRole('user')}>
                        <UserIcon/>
                    </Button>
                    <Button size='lg' onClick={async ()=> await handleDelete()}>
                        <Trash/>
                    </Button>
                </div>
            </div>
            {users && <AdminTable users={users} ids={ids} setIds={setIds}></AdminTable>}

        </>
    )
}