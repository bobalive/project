import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {TableInterface} from "./Table.interface.ts";
import {NavLink, useNavigate} from "react-router-dom";


export const TableMenu = ({collection,item}:TableInterface)=>{

    const navigate = useNavigate()

    return (
        <div className="border shadow-sm rounded-lg">
            <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead  className="w-[150px]">Id</TableHead>
                        <TableHead className="w-[150px]">{item?'Name':"Collection"}</TableHead>
                        <TableHead>{item?'Tags':"Description"}</TableHead>
                        {collection&&<>
                            <TableHead className="w-[150px]">Theme</TableHead>
                            <TableHead className="w-[150px]">Items</TableHead>
                            </>}
                        {item &&
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
                                <TableRow key={item._id} onClick={()=> navigate("/collection/" + item._id)}>
                                    <TableCell>
                                        <NavLink className="font-semibold" to={"collection/" + item._id}>
                                            {item._id}
                                        </NavLink>
                                    </TableCell>
                                    <TableCell>
                                        <NavLink className="font-semibold" to={"collection/" + item._id}>
                                            {item.name}
                                        </NavLink>
                                    </TableCell>
                                    <TableCell className="text-sm">{item.description}</TableCell>
                                    <TableCell>{item.theme}</TableCell>
                                    <TableCell>{item.items.length}</TableCell>
                                </TableRow>
                            )
                    })}
                    {item&&item.map(data=>{

                        return(<TableRow key={data._id} onClick={()=> navigate("/item/" + data._id)}>
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