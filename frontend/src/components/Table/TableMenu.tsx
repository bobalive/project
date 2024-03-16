import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {TableInterface} from "./Table.interface.ts";
import {NavLink} from "react-router-dom";
import {Input} from "../ui/input.tsx";
import {useState} from "react";


export const TableMenu = ({collection,item}:TableInterface)=>{
    const [selectedCollections , setSelectedCollections]= useState<string[]>([])
    function selectUser(item:string) {
        if (selectedCollections.includes(item)) {
             setSelectedCollections(selectedCollections.filter((prev) => prev !== item))
        } else {
            setSelectedCollections([...selectedCollections, item])
        }
    }
    console.log(selectedCollections)
    const selectAllCollections = ()=>{
        if(collection){
            if(selectedCollections.length == collection.length){
                setSelectedCollections([])
            }else{
                setSelectedCollections(collection?.map(item=>item._id))
            }
        }
        if(item){
            if(selectedCollections.length == item.length){
                setSelectedCollections([])
            }else{
                setSelectedCollections(item?.map(item=>item._id))
            }
        }

    }

    return (
        <div className="border shadow-sm rounded-lg">
            <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-4">
                            <Input type="checkbox" className="w-4" onChange={selectAllCollections}></Input>
                        </TableHead>
                        <TableHead  className="w-[150px]">Id</TableHead>
                        <TableHead className="w-[150px]">{item?'Name':"Collection"}</TableHead>
                        <TableHead>{item?'Tags':"Description"}</TableHead>
                        {collection&&<>
                            <TableHead className="w-[150px]">Theme</TableHead>
                            <TableHead className="w-[150px]">Items</TableHead>
                            </>}
                        {item&&item.length>0 &&
                            <>
                            {item[0].fields.map(field=>(
                                <TableHead className="w-[150px]">{field.name}</TableHead>
                            ))}
                            {item[0].req_fields &&
                                item[0].req_fields.map(field=>(
                                    <TableHead className="w-[150px]">{field.name}</TableHead>
                                ))}
                        </>}

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {collection&&collection.map(item=> {
                            return(
                                <TableRow key={item._id} >
                                    <TableCell>
                                        <Input type="checkbox" className="w-4" onClick={()=>selectUser(item._id)} checked={selectedCollections.includes(item._id)}></Input>
                                    </TableCell>
                                    <TableCell>
                                        <NavLink className="font-semibold" to={"/collection/" + item._id}>
                                            {item._id}
                                        </NavLink>
                                    </TableCell>
                                    <TableCell>
                                        <NavLink className="font-semibold" to={"/collection/" + item._id}>
                                            {item.name}
                                        </NavLink>
                                    </TableCell>
                                    <TableCell className="text-sm">{item.description}</TableCell>
                                    <TableCell>{item.theme}</TableCell>
                                    <TableCell>{item.items&&item.items.length}</TableCell>
                                </TableRow>
                            )
                    })}
                    {item&& item.length>0&&item.map(data=>{

                        return(<TableRow key={data._id} >
                            <TableCell>
                                <Input type="checkbox" className="w-4" onClick={()=>selectUser(data._id)} checked={selectedCollections.includes(data._id)}></Input>
                            </TableCell>
                            <TableCell>
                                <NavLink className="font-semibold" to={"/item/" + data._id}>
                                    {data._id}
                                </NavLink>
                            </TableCell>
                            <TableCell>
                                <NavLink className="font-semibold" to={"/item/" + data._id}>
                                    {data.name}
                                </NavLink>
                            </TableCell>
                            <TableCell className="w-[150px]">{data.tags&&[...data.tags]}</TableCell>
                            {data.fields.map(field=>(
                                <TableCell className="w-[150px]">{field.value}</TableCell>
                            ))}
                            {data.req_fields &&
                                data.req_fields.map(field=>(
                                    <TableCell>{field.value}</TableCell>
                                ))}

                        </TableRow>)
                    })}
                </TableBody>
            </Table>
        </div>
    )
}