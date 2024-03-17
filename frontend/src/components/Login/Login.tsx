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

export function Login() {
    const {register:newregister , handleSubmit:signinSubmit , formState:{errors:newerrors}} = useForm<UserInteface>()
    const {register, handleSubmit:loginSubmit, formState: { errors },} = useForm<UserInteface>()


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
            <TabsList className="grid w-full grid-cols-2 ">
                <TabsTrigger value="account" onClick={()=> setErr(false)}>Login</TabsTrigger>
                <TabsTrigger value="password" onClick={()=> setErr(false)}>Sign In</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <form action="" onSubmit={loginSubmit(onLogin)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        {err && <span className="bg-red-500 p-1"> email or password is incorrect</span>}
                        <CardDescription>
                            If you already have account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="login-email">Email</Label>
                            <Input id="login-email"  type="email" {...register('email',{required:true})}/>
                            {errors.email && <span className="text-red-500">Email is required</span>}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="login-password">Password</Label>
                            <Input id="login-password" type="password" {...register('password' ,{required:true,minLength:6})}/>
                            {errors.password && <span className="text-red-500">Password shoud be at least 6 char </span>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Submit</Button>
                    </CardFooter>
                </Card>
                </form>
            </TabsContent>
            <TabsContent value="password">
                <form action="" onSubmit={signinSubmit(onSignin)}>
                <Card className='dark'>
                    <CardHeader>
                        <CardTitle>Sign in</CardTitle>
                        {err && <span className="bg-red-500 p-1"> User alredy exist</span>}
                        <CardDescription>
                            Create account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Name</Label>
                            <Input id="current" type="text" {...newregister("name" ,{required:true})}/>
                            {newerrors.name && <span className="text-red-500">Name is required </span>}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">Email</Label>
                            <Input id="new" type="email" {...newregister("email" ,{required:true})}/>
                            {newerrors.email && <span className="text-red-500">Password shoud be at least 6 char </span>}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">Password</Label>
                            <Input id="new" type="password" {...newregister("password" , {required:true ,minLength:6}) }/>
                            {newerrors.password && <span className="text-red-500">Password shoud be at least 6 char </span>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Submit</Button>
                    </CardFooter>
                </Card>
                </form>
            </TabsContent>
        </Tabs>
    )
}
