import {CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card} from "../components/ui/card"
import {Label} from "../components/ui/label"
import {Input} from "../components/ui/input"
import {Button} from "../components/ui/button"
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react"
import {getOneCollection} from "../api/collection.api"
import {CollectionInterface} from "../interfaces/Collection.interface"

import {SendItemInterface} from "../interfaces/Item.interface.ts";
import {changeItem, createItems, getItem} from "../api/items.api.ts";
import {Textarea} from "../components/ui/textarea.tsx";


export function AddItems() {
    const {id, itemId} = useParams()

    const navigate = useNavigate()
    const [collection, setCollection] = useState<CollectionInterface | null>()


    const [name, setName] = useState('')
    const [custInt, setCustInt] = useState<number[]>([0])
    const [custStr, setCustStr] = useState<string[]>([''])
    const [custBool, setCustBool] = useState<boolean[]>([false])
    const [custDate, setCustDate] = useState<string[]>([''])
    const [custLine, setCustLine] = useState<string[]>([''])

    const [tags, setTags] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (collection?._id) {
            let data: SendItemInterface = {
                collectionId: collection?._id ? collection?._id : '',
                custom_fields: {
                    custom_int: custInt,
                    custom_boolean: custBool,
                    custom_date: custDate,
                    custom_string: custStr,
                    custom_multi_line: custLine
                },
                name: name,
                tags: tags.split(' '),
            }
            if (itemId && id) {
                await changeItem({...data, _id: itemId})
                navigate('/item/' + itemId)
            } else {
                await createItems({...data})
                navigate('/collection/' + id)
            }
        }
    }


    const getCollection = async () => {
        try {
            if (id) {
                const newCollection = await getOneCollection(id);
                if (newCollection) {
                    setCollection(newCollection[0]);
                }
            } else {
                navigate('/')
            }
        } catch (error) {
            console.error("Error fetching collection:", error);
        }
    };


    useEffect(() => {
        if (itemId && id) {
            getItem(itemId).then(res => {
                if (res) {
                    let custFields = res.custom_fields
                    setName(res.name)
                    setTags(res.tags.join(' '))

                    setCustInt(custFields.custom_int)
                    setCustStr(custFields.custom_string)
                    setCustBool(custFields.custom_boolean)
                    setCustDate(custFields.custom_date)
                    setCustLine(custFields.custom_multi_line)
                }
            })
        }

        getCollection()
    }, [])

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="flex items-center justify-center mt-4">
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
                            <Input placeholder="name of something" id="name" value={name} required={true}
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="grid gap-4 ">
                            <Label className="sm:col-span-2" htmlFor="name">
                                Item Tags
                            </Label>
                            <Input placeholder="#" id="tags" value={tags} required={true}
                                   onChange={(e) => setTags(e.target.value)}
                                   onBlur={(e) => {
                                       const value = e.target.value.split(' ');
                                       const newValue = value.map(item => {
                                           if (!item.includes('#') && item) {
                                               return '#' + item;
                                           }
                                           return item
                                       })
                                       setTags(newValue.join(' '));

                                   }}/>
                        </div>
                        <div className="flex flex-col gap-4">
                            {collection?.custom_fields?.custom_int[0] && <h4> Custom integer </h4>}
                            {collection?.custom_fields?.custom_int.map((item, i) => (
                                <div className="flex align-center justify-start gap-4 w-fit">
                                    <Label className="flex items-center">
                                        {item}:
                                    </Label>
                                    <Input type="number" className="block"
                                           onChange={(e) => {
                                               setCustInt(prev => {
                                                   prev[i] = +e.target.value
                                                   return [...prev]
                                               })
                                           }}
                                           value={custInt[i]}/>
                                </div>
                            ))}
                            {collection?.custom_fields?.custom_string[0] && <h4> Custom string </h4>}
                            {collection?.custom_fields?.custom_string.map((item, i) => (
                                <div className=" flex align-center justify-start gap-4  w-fit">
                                    <Label className="flex items-center">
                                        {item}:
                                    </Label>
                                    <Input type="text" className="block"
                                           onChange={(e) => {
                                               setCustStr(prev => {
                                                   prev[i] = e.target.value
                                                   return [...prev]
                                               })
                                           }}
                                           value={custStr[i]}/>
                                </div>
                            ))}
                            {collection?.custom_fields?.custom_boolean[0] && <h4> Custom boolean </h4>}
                            {collection?.custom_fields?.custom_boolean.map((item, i) => (
                                <div className=" flex items-center justify-start gap-4  w-fit">
                                    <Label className="flex items-center">
                                        {item}:
                                    </Label>
                                    <Input type="checkbox"
                                           onChange={() => {
                                               setCustBool(prev => {
                                                   const newState = [...prev];
                                                   newState[i] = !newState[i];
                                                   return newState;
                                               });
                                           }}
                                           checked={custBool[i]}
                                           className="block w-5 h-5"/>
                                </div>
                            ))}
                            {collection?.custom_fields?.custom_date[0]
                                && <h4> Custom date </h4>}
                            {collection?.custom_fields?.custom_date?.map((item, i) => (
                                <div className=" flex align-center justify-start gap-4  w-fit">
                                    <Label className="flex items-center">{item}:</Label>
                                    <Input type="date" className=" block text-black bg-gray-300 "
                                           onChange={(e) => {
                                               setCustDate(prev => {
                                                   prev[i] = e.target.value
                                                   return [...prev]
                                               })
                                           }} value={custDate}
                                    />
                                </div>
                            ))}
                            {collection?.custom_fields?.custom_multi_line
                                &&
                                <>
                                    <h4> Custom Multi Line </h4>
                                    {collection.custom_fields.custom_multi_line.map((item, i) => (
                                        <div className=" flex align-center justify-start gap-4">
                                            <Label className="flex items-center">
                                                {item}:
                                            </Label>
                                            <Textarea className="block text-black bg-gray-300 "
                                                      onChange={(e) => {
                                                          setCustLine(prev => {
                                                              prev[i] = e.target.value
                                                              return [...prev]
                                                          })
                                                      }} value={custLine}
                                            />
                                        </div>
                                    ))}
                                </>
                            }
                        </div>

                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>
        </form>
    )

}
