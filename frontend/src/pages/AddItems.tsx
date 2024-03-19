import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "../components/ui/select"
import { Button } from "../components/ui/button"
import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react"
import { getOneCollection } from "../api/collection.api"
import { CollectionInterface } from "../interfaces/Collection.interface"

export  function AddItems() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [collection , setCollection] = useState<CollectionInterface|null>()
    useEffect(()=>{
        const getCollection = async () => {
            try {
                if (id) {
                    const newCollection = await getOneCollection(id);
                    if(newCollection){
                        setCollection(newCollection[0]);
                    }

                }else{
                    navigate('/')
                }
            } catch (error) {
                console.error("Error fetching collection:", error);
            }
        };
        getCollection()
    },[])

    return (
        <div className="flex items-center justify-center h-screen">

        
        <Card className="w-full max-w-3xl">
            <CardHeader>
                <CardTitle>{collection?.name} Collection</CardTitle>
                <CardDescription>
                    A collection of my favorite books, complete with author information and publication dates.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="grid gap-4 md:gap-8 p-4">
                    <div className="grid gap-4">
                        <Label className="sm:col-span-2" htmlFor="name">
                            Item Name
                        </Label>
                        <Input placeholder="name of something" id="name" />
                    </div>
                    <div className="grid gap-4">
                        <Label className="sm:col-span-2" htmlFor="name">
                            Item Tags
                        </Label>
                        <Input placeholder="#" id="tags" />
                    </div>
                    <div className="flex flex-col w-fit gap-4">
                            {collection?.custom_fields?.custom_int[0] &&<h4> Custom integer </h4>}
                                {collection?.custom_fields?.custom_int.map(item => (
                                    <div className="flex align-center justify-start gap-4">
                                        <Label className="flex items-center">
                                                {item}
                                        </Label>
                                            <Input type="text" className="block"/>
                                
                                 </div>
                                ))}
                                {collection?.custom_fields?.custom_string[0] &&<h4> Custom string </h4>}
                                {collection?.custom_fields?.custom_string.map(item => (
                                    <div className=" flex align-center justify-start gap-4">
                                        <Label className="flex items-center">
                                                {item}
                                        </Label>
                                            <Input type="text" className="block"/>
                                
                                 </div>
                                ))}
                                {collection?.custom_fields?.custom_boolean[0]&&<h4> Custom boolean </h4>}
                                {collection?.custom_fields?.custom_boolean.map(item => (
                                    <div className=" flex align-center justify-start gap-4">
                                        <Label className="flex items-center">
                                                {item}
                                        </Label>
                                            <Input type="text" className="block"/>
                                
                                 </div>
                                ))}
                                {collection?.custom_fields?.custom_date[0] &&<h4> Custom date </h4>}
                                {collection?.custom_fields?.custom_date.map(item => (
                                    <div className=" flex align-center justify-start gap-4">
                                        <Label className="flex items-center">
                                                {item}
                                        </Label>
                                            <Input type="text" className="block"/>
                                
                                 </div>
                                ))}
                            </div>

                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Changes</Button>
            </CardFooter>
        </Card>
        </div>
    )
}

