import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../components/ui/card.tsx";
import {Label} from "../components/ui/label.tsx";
import {Input} from "../components/ui/input.tsx";
import {Button} from "../components/ui/button.tsx";
import {Textarea} from "../components/ui/textarea.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../components/ui/select.tsx";
import {useForm ,Controller } from "react-hook-form";
import {CollectionInterface} from "../interfaces/Collection.interface.ts";
import {createCollection, editCollection} from "../api/collection.api.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

import {CustomFieldsTable} from "../components/CustomFieldsTable/CustomFieldsTable.tsx";
import {useGetCollection} from "../CustomHooks/useGetCollection.tsx";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../interfaces/Store.interface.ts";
import {AppDispatch, UserInteface} from "../interfaces/User.interface.ts";
import {auth} from "../Store/Slices/userSlice.ts";



export  function AddCollection() {
    const {id, userId} = useParams()

    const navigate = useNavigate()
    const {register, handleSubmit,setValue,control} = useForm<CollectionInterface>()
    const formRef=  useRef<any>()

    const user = useSelector<StoreInterface ,UserInteface>(store => store.user )
    const dispatch = useDispatch<AppDispatch>()

    const [field , setField] = useState('')
    const [inputValue , setInputValue ] = useState('')

    const {customField,setCustomField,handleFieds} = useGetCollection({setValue,id})
    const {t} = useTranslation()
    const onSubmit = async ()=>{
         const formData = new FormData(formRef.current)
         const customFieldsSrting = JSON.stringify(customField)
         formData.append('custom_fields', customFieldsSrting)
        if(id){
            formData.append('_id' , id)
            await editCollection(formData)
            navigate("/collection/"+id)
        }else{
            if(userId){
                formData.append('userId',userId)
            }
            await createCollection(formData)
            navigate("/user/"+userId)
        }
    }
    const handleThemeChange = (event:any) => {
        setValue("theme", event);
    };
    useEffect(() => {
        dispatch(auth())
        if(user._id !=userId){
            if(user.status !== 'active' && user.role != 'admin'){
                navigate('/')
            }
        }
    }, [user]);


    return (
        <Card className="w-full max-w-3xl mx-auto  left-[25%] z-10">
            <form className="w-[100%] relative p-5 " onSubmit={handleSubmit(onSubmit)} action="" ref={formRef}>
                <CardHeader>
                    <CardTitle>{t('addCollection.collectionTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="grid gap-4 md:gap-8 p-4">
                        <div className="grid gap-4">
                            <Label className="sm:col-span-2" htmlFor="name">
                                {t('addCollection.collectionNameLabel')}
                            </Label>
                            <Input placeholder={"name of the collection"} id="name"  {...register('name' , {required:true}) } />
                        </div>
                        <div className="grid gap-4">
                            <Label className="sm:col-span-2" htmlFor="description">
                                {t('addCollection.descriptionLabel')}
                            </Label>
                            <Textarea
                                className="min-h-[100px]"
                                id="description"
                                placeholder={t('addCollection.descriptionPlaceholder')}
                                {...register('description' ,)}
                            />
                        </div>
                        <div className="grid gap-4">
                            <Label className="sm:col-span-2" htmlFor="theme">
                                {t('addCollection.themePlaceholder')}
                            </Label>
                            <Controller
                                name="theme" // Provide a name for your select field
                                control={control}
                                defaultValue="Books" // Set the default value
                                render={({ field }) => (
                                    <Select {...field} onValueChange={handleThemeChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Books" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Books">{t('addCollection.booksOption')}</SelectItem>
                                            <SelectItem value="Signs">{t('addCollection.signsOption')}</SelectItem>
                                            <SelectItem value="Silverware">{t('addCollection.silverwareOption')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="flex flex-col w-fit gap-4">
                            <Label className="sm:col-span-2 text-3xl">
                                {t('addCollection.addFieldLabel')}
                            </Label>
                            <Select onValueChange={(e)=> setField(e)} value={field}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="string"> {t('addCollection.stringValue')}</SelectItem>
                                    <SelectItem value="int"> {t('addCollection.intValue')}</SelectItem>
                                    <SelectItem value="bool"> {t('addCollection.boolValue')}</SelectItem>
                                    <SelectItem value="date"> {t('addCollection.dateValue')}</SelectItem>
                                    <SelectItem value="multi_line"> {t('addCollection.multilineValue')}</SelectItem>
                                </SelectContent>
                            </Select>

                                <div className={(field?"h-fit p-3 ":"h-0 " )+'transition-all overflow-hidden gap-2 w-[300px] '}>
                                    <Label className="sm:col-span-2">
                                        {t('addCollection.customFieldLabel')} {field}
                                    </Label>
                                    <Input type="text" className="block" value={inputValue} onChange={(e)=> setInputValue(e.target.value)}/>
                                    <Button onClick={(e)=> {
                                        e.preventDefault()
                                        handleFieds(field, inputValue)
                                        setField('')
                                        setInputValue('')
                                    }}
                                        className="mt-2"
                                    >{t('addCollection.saveButton')}</Button>
                                </div>
                        </div>
                        <CustomFieldsTable customField={customField} setCustomField={setCustomField} _id = {id}></CustomFieldsTable>
                        <div className="grid gap-4">
                            <Label className="sm:col-span-2" htmlFor="image">
                                {t('addCollection.imageLabel')}
                            </Label>
                            <Input id="photo" className="bg-gray-300" name="photo" type="file"/>
                            <div>{t('addCollection.imageUploadInstruction')}</div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button >{t('form.saveChanges')}</Button>
                </CardFooter>
            </form>
        </Card>

    )
}

