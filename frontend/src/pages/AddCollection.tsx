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
import {useRef} from "react";



export  function AddCollection() {
    const navigate = useNavigate()
    const {register, handleSubmit,setValue,control} = useForm<CollectionInterface>()
    const formRef=  useRef<any>()

    const onSubmit = async ()=>{
         const formData = new FormData(formRef.current)
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
                        <div className="grid gap-4">
                            <Label className="sm:col-span-2" htmlFor="image">
                                Image
                            </Label>
                            <Input id="photo" className="bg-gray-300" name="photo" type="file" />
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

