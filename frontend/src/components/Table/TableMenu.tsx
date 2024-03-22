import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {TableInterface} from "./Table.interface.ts";
import {NavLink} from "react-router-dom";
import {Input} from "../ui/input.tsx";


export const TableMenu = ({collection,item,setId,id,custom_fields}:TableInterface)=>{

    const selectCollection=(item:string)=> {
        if(id &&setId){
            if (id.includes(item)) {
                setId(id.filter((prev) => prev !== item))
            } else {
                setId([...id, item])
            }
        }

    }
    const selectAllCollections = ()=>{
        if(id &&setId){
            if(collection){
                if(id.length == collection.length){
                    setId([])
                }else{
                    setId(collection?.map(item=>item._id))
                }
            }
            if(item){
                if(id.length == item.length){
                    setId([])
                }else{
                    setId(item?.map(item=>item._id))
                }
            }
        }

    }


    return (
        <div className="border shadow-sm rounded-lg">
            <Table >
                <TableHeader>
                    <TableRow>
                        {id&&<TableHead className="w-4">
                            <Input type="checkbox" className="w-4" onChange={selectAllCollections}
                                   checked={id.length != 0&&(id.length == collection?.length || id.length == item?.length)}></Input>
                        </TableHead>}
                        {collection&&
                            <TableHead className="w-4">
                               Photo
                            </TableHead>
                        }
                        <TableHead  className="w-[150px]">Id</TableHead>
                        <TableHead className="w-[150px]">{item?'Name':"Collection"}</TableHead>
                        <TableHead>{item?'Tags':"Description"}</TableHead>
                        {collection&&<>
                            <TableHead className="w-[150px]">Theme</TableHead>
                            <TableHead className="w-[150px]">Items</TableHead>
                            </>}
                        {item&&custom_fields&&
                            <>
                            {custom_fields.custom_string.map(item=>(
                                 <TableHead className="w-[150px] text-center">{item}</TableHead>
                            ))}
                                {custom_fields.custom_int.map(item=>(
                                <TableHead className="w-[150px] text-center">{item}</TableHead>
                                ))}
                                {custom_fields.custom_boolean.map(item=>(
                                <TableHead className="w-[150px] text-center">{item}</TableHead>
                                ))}
                                {custom_fields.custom_date.map(item=>(
                                <TableHead className="w-[150px] text-center">{item}</TableHead>
                                ))}
                            </>
                        }

                    </TableRow>
                </TableHeader>
                <TableBody  >
                    {collection&&collection.map(item=> {
                            return(
                                <TableRow key={item._id} >
                                    {id&&<TableCell>
                                        <Input type="checkbox" className="w-4" onClick={() => selectCollection(item._id)}
                                               checked={id.includes(item._id)}></Input>
                                    </TableCell>}
                                    <TableCell className="" >
                                        <NavLink to={"/collection/" + item._id}>
                                            <img src = {item.photo?item.photo:'/vite.svg'} className="w-11 h-11 border-2 border-gray-100 rounded object-contain" loading={"lazy"}/>
                                        </NavLink>
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
                    {item &&item.length>0 && custom_fields
                        && item.map(data=>{
                        return(<TableRow key={data._id}>
                            {id&&<TableCell>
                                <Input type="checkbox" className="w-4" onClick={() => selectCollection(data._id)}
                                       checked={id.includes(data._id)}></Input>
                            </TableCell>}
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
                            <TableCell>{data.tags
                                && data.tags.map(tag=>(
                                    <span>{tag}</span>
                                ))

                            }</TableCell>
                            {custom_fields.custom_int.map((_item,i)=>(
                                <TableCell className="w-[150px] text-center">{data.custom_fields.custom_int[i]}</TableCell>
                            ))}
                            {custom_fields.custom_string.map((_item,i)=>(
                                <TableCell className="w-[150px] text-center">{data.custom_fields.custom_string[i]}</TableCell>
                            ))}
                            {custom_fields.custom_boolean.map((_item,i)=>(
                                <TableCell className="w-[150px] text-center">{data.custom_fields.custom_boolean[i]}</TableCell>
                            ))}
                            {custom_fields.custom_date.map((_item,i)=>(
                                <TableCell className="w-[150px] text-center">{data.custom_fields.custom_date[i]}</TableCell>
                            ))
                            }

                        </TableRow>)
                    })}
                </TableBody>
            </Table>
        </div>
    )
}