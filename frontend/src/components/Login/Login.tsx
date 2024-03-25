import { Button } from "../ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../ui/tabs"

import { useForm, SubmitHandler } from "react-hook-form"
import {UserInteface} from "../../interfaces/User.interface.ts";
import {useDispatch} from "react-redux";
import { login, signin} from "../../api/user.api.ts";
import {getMyColletion} from "../../api/collection.api.ts";
import { useState} from "react";
import {putUser} from "../../Store/Slices/userSlice.ts";
import {SigninInterface} from "../../interfaces/Login.interface.ts";
import {setMyCollection} from "../../Store/Slices/collectionSlice.ts";
import {useTranslation} from "react-i18next";

export function Login() {
    const {register:newregister , handleSubmit:signinSubmit , formState:{errors:newerrors}} = useForm<UserInteface>()
    const {register, handleSubmit:loginSubmit, formState: { errors },} = useForm<UserInteface>()
    const { t } = useTranslation();

    const dispatch = useDispatch()

    const [err , setErr] = useState(false)


        const onLogin: SubmitHandler<UserInteface> = async (data) => {
        const user = await login(data)

        if(user){
            dispatch(putUser({...user[0]}))
            const collections = await getMyColletion()
            if(collections){
                dispatch(setMyCollection([...collections]))
                location.reload()
            }

        }else {
            setErr(true)
        }
    }

    const onSignin:SubmitHandler<SigninInterface> = async (data)=>{
        const newUser:UserInteface|null|undefined = await signin(data)

        if(newUser){
            dispatch(putUser({...newUser}))
        }else{
            setErr(true)
        }
    }

    return (
        <Tabs defaultValue="account" className="w-[400px] dark:text-white">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account" onClick={() => setErr(false)}>{t('tabs.login')}</TabsTrigger>
                <TabsTrigger value="password" onClick={() => setErr(false)}>{t('tabs.signin')}</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <form action="" onSubmit={loginSubmit(onLogin)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('login.title')}</CardTitle>
                            {err && <span className="bg-red-500 p-1">{t('login.error')}</span>}
                            <CardDescription>
                                {t('login.description')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="login-email">{t('login.email')}</Label>
                                <Input id="login-email" type="email" {...register('email', { required: true })} />
                                {errors.email && <span className="text-red-500">{t('login.emailError')}</span>}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="login-password">{t('login.password')}</Label>
                                <Input id="login-password" type="password" {...register('password', { required: true, minLength: 6 })} />
                                {errors.password && <span className="text-red-500">{t('login.passwordError')}</span>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>{t('buttons.submit')}</Button>
                        </CardFooter>
                    </Card>
                </form>
            </TabsContent>
            <TabsContent value="password">
                <form action="" onSubmit={signinSubmit(onSignin)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('signin.title')}</CardTitle>
                            {err && <span className="bg-red-500 p-1">{t('signin.error')}</span>}
                            <CardDescription>
                                {t('signin.description')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">{t('signin.name')}</Label>
                                <Input id="current" type="text" {...newregister("name", { required: true })} />
                                {newerrors.name && <span className="text-red-500">{t('signin.nameError')}</span>}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">{t('signin.email')}</Label>
                                <Input id="new" type="email" {...newregister("email", { required: true })} />
                                {newerrors.email && <span className="text-red-500">{t('signin.emailError')}</span>}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">{t('signin.password')}</Label>
                                <Input id="new" type="password" {...newregister("password", { required: true, minLength: 6 })} />
                                {newerrors.password && <span className="text-red-500">{t('signin.passwordError')}</span>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>{t('buttons.submit')}</Button>
                        </CardFooter>
                    </Card>
                </form>
            </TabsContent>
        </Tabs>
    )
}
