import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../components/ui/card.tsx";
import {Label} from "../components/ui/label.tsx";
import {Input} from "../components/ui/input.tsx";
import {Button} from "../components/ui/button.tsx";
import {Textarea} from "../components/ui/textarea.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../components/ui/select.tsx";
import {useForm ,Controller } from "react-hook-form";
import {CollectionInterface} from "../interfaces/Collection.interface.ts";
import {createCollection} from "../api/collection.api.ts";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import { CustomFiedNameInteface} from "../interfaces/CustomFied.inteface.ts";



export  function AddCollection() {
    const navigate = useNavigate()
    const {register, handleSubmit,setValue,control} = useForm<CollectionInterface>()
    const formRef=  useRef<any>()
    const [customField , setCustomField ] = useState<CustomFiedNameInteface>({
        custom_int:[],
        custom_boolean:[],
        custom_date:[],
        custom_string:[],
        custom_multi_line:[]
    })
    const [field , setField] = useState('')
    const [inputValue , setInputValue ] = useState('')


    console.log(customField)
    const handleFieds = (field:string)=>{

        if(inputValue){

        switch (field){
            case 'string':
                if(customField.custom_string.length<3 ){
                    setCustomField({...customField , custom_string:[...customField.custom_string , inputValue]})
                }
                break;
            case "int":
                if(customField.custom_int.length<3 ) {
                    setCustomField({...customField, custom_int: [...customField.custom_int, inputValue]})
                }
                break;
            case "bool":
                if(customField.custom_boolean.length<3 ) {
                setCustomField({...customField , custom_boolean:[...customField.custom_boolean , inputValue]})
                }
                break;
            case "date":
                if(customField.custom_date.length<3 ) {
                    setCustomField({...customField, custom_date: [...customField.custom_date, inputValue]})
                }
                break;
            case "multi_line":
                if(customField.custom_multi_line.length<3 ) {
                    setCustomField({...customField, custom_multi_line: [...customField.custom_multi_line, inputValue]})
                }
                break;
            default:
                break;
        }}
    }
    const onSubmit = async ()=>{
         const formData = new FormData(formRef.current)
         const customFieldsSrting = JSON.stringify(customField)
         formData.append('custom_fields', customFieldsSrting)
         await createCollection(formData)
         navigate("/my-collections")
    }

    const handleThemeChange = (event:any) => {
        setValue("theme", event);
    };
    return (

        <Card className="w-full max-w-3xl mx-auto  left-[25%] z-10">
            <form className="w-[100%] relative p-5 " onSubmit={handleSubmit(onSubmit)} action="" ref={formRef}>
                <CardHeader>
                    <CardTitle>My Book Collection</CardTitle>
                    <CardDescription>
                        A collection of my favorite books, complete with author information and publication dates.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="grid gap-4 md:gap-8 p-4">
                        <div className="grid gap-4">
                            <Label className="sm:col-span-2" htmlFor="name">
                                Collection Name
                            </Label>
                            <Input placeholder={"name of the collection"} id="name"  {...register('name' , {required:true}) } />
                        </div>
                        <div className="grid gap-4">
                            <Label className="sm:col-span-2" htmlFor="description">
                                Description
                            </Label>
                            <Textarea
                                className="min-h-[100px]"
                                id="description"
                                placeholder="Enter a description for your collection"
                                {...register('description' ,)}
                            />
                        </div>
                        <div className="grid gap-4">
                            <Label className="sm:col-span-2" htmlFor="theme">
                                Theme
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
                                            <SelectItem value="Books">Books</SelectItem>
                                            <SelectItem value="Signs">Signs</SelectItem>
                                            <SelectItem value="Silverware">Silverware</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                        </div>
                        <div className="flex flex-col w-fit gap-4">
                            <Label className="sm:col-span-2 text-3xl">
                                Add custom field
                            </Label>

                            <Select onValueChange={(e)=> setField(e)} value={field}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="string">String Value</SelectItem>
                                    <SelectItem value="int">Int Value</SelectItem>
                                    <SelectItem value="bool">Bool Value</SelectItem>
                                    <SelectItem value="date">Date Value</SelectItem>
                                    <SelectItem value="multi_line">Multiline Value</SelectItem>
                                </SelectContent>
                            </Select>
                            
                                <div className={(field?"h-fit p-3 ":"h-0 " )+'transition-all overflow-hidden gap-2 w-[300px] '}>
                                    <Label className="sm:col-span-2">
                                        custom {field}
                                    </Label>
                                    <Input type="text" className="block" value={inputValue} onChange={(e)=> setInputValue(e.target.value)}/>
                                    <Button onClick={(e)=> {
                                        e.preventDefault()
                                        handleFieds(field)
                                        setField('')
                                        setInputValue('')
                                    }}
                                        className="mt-2" 
                                    >Save</Button>
                                </div>
                                

                        </div>
                        <h1 className="text-xl">Custom Fields:</h1>
                        <div className="flex justify-between gap-4">
                            <div className="flex flex-col w-fit gap-4">
                                <h4>Custom string </h4>
                                {customField.custom_string.map(item => (
                                    <div
                                        className="border border-gray-100 flex align-middle justify-center rounded-2xl">{item}</div>
                                ))}
                            </div>

                            <div className="flex flex-col w-fit gap-4">
                                <h4>Custom int</h4>
                                {customField.custom_int.map(item => (
                                    <div
                                        className="border border-gray-100 flex align-middle justify-center rounded-2xl">{item}</div>
                                ))}
                            </div>

                            <div className="flex flex-col w-fit gap-4">
                                <h4>Custom bool </h4>
                                {customField.custom_boolean.map(item => (
                                    <div
                                        className="border border-gray-100 flex align-middle justify-center rounded-2xl">{item}</div>
                                ))}
                            </div>

                            <div className="flex flex-col w-fit gap-4">
                                <h4>Custom date </h4>
                                {customField.custom_date.map(item => (
                                    <div
                                        className="border border-gray-100 flex align-middle justify-center rounded-2xl">{item}</div>
                                ))}
                            </div>
                            <div className="flex flex-col w-fit gap-4">
                                <h4>Custom Multiline</h4>
                                {customField.custom_multi_line.map(item => (
                                    <div
                                        className="border border-gray-100 flex align-middle justify-center rounded-2xl">{item}</div>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <Label className="sm:col-span-2" htmlFor="image">
                                Image
                            </Label>
                            <Input id="photo" className="bg-gray-300" name="photo" type="file"/>
                            <div>Upload an image to represent your collection. Max file size: 25MB</div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button >Save Changes</Button>
                </CardFooter>
            </form>
        </Card>

    )
}

