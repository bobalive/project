import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {TableInterface} from "./Table.interface.ts";
import {NavLink} from "react-router-dom";
import {Input} from "../ui/input.tsx";
import {useTranslation} from "react-i18next";
import {Button} from "../ui/button.tsx";
import {ArrowUpDown} from "lucide-react";
import {sortItem} from "../../api/items.api.ts";
import {useState} from "react";
import {nameType} from "../CustomFieldsTable/FieldValue/FieldValue.interface.ts";

type SortDirection = 'asc' | 'desc';
export const TableMenu = ({collection, item, setId, id, custom_fields ,setItem}: TableInterface) => {
    const { t } = useTranslation();
    const [sortDirection, setSortDirection] = useState<{ [key: string]:SortDirection }>({})
    const fields:nameType[] = ['custom_string' , 'custom_int', 'custom_boolean',"custom_date"]

    const handleSortClick = (collectionId:string ,field:string,index = -1) => {
        console.log(field)
        console.log(index)
        const newSortDirection = sortDirection[field+index] === 'asc' ? 'desc' : 'asc';
        sortItem(collectionId, field, newSortDirection,index)
            .then(res => {
                if (setItem) {
                    setItem(res);
                }
                setSortDirection(prevState => ({
                    ...prevState,
                    [field+index]: newSortDirection
                }));
            });
    };
    const selectCollection = (item: string) => {
        if (id && setId) {
            if (id.includes(item)) {
                setId(id.filter((prev) => prev !== item))
            } else {
                setId([...id, item])
            }
        }
    }
    const selectAllCollections = () => {
        if (id && setId) {
            if (collection) {
                if (id.length == collection.length) {
                    setId([])
                } else {
                    setId(collection?.map(item => item._id))
                }
            }
            if (item) {
                if (id.length == item.length) {
                    setId([])
                } else {
                    setId(item?.map(item => item._id))
                }
            }
        }
    }

    return (<div className="border shadow-sm rounded-lg ">
            <Table>
                <TableHeader>
                    <TableRow>
                        {id && <TableHead className="w-4">
                            <Input type="checkbox" className="w-4" onChange={selectAllCollections}
                                   checked={id.length != 0 && (id.length == collection?.length || id.length == item?.length)}></Input>
                        </TableHead>}
                        {collection && <TableHead className="w-4">
                            {t('table.photo')}
                        </TableHead>}
                        <TableHead className="w-[150px]">{
                            item
                            ? <Button
                                variant="ghost"
                                onClick={() =>{
                                    handleSortClick(item[0].collectionId , '_id')
                                }}>
                                {t('table.id')}
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                            :t('table.id')
                        }</TableHead>
                        <TableHead className="w-[150px]">
                            {item
                                ? <Button
                                    variant="ghost"
                                    onClick={() =>{
                                        handleSortClick(item[0].collectionId , 'name')
                                    }}>
                                    {t('table.name')}
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                                :t('table.collection')
                            }


                        </TableHead>
                        <TableHead>
                            {item
                                ? <Button
                                    variant="ghost"
                                    onClick={() =>  handleSortClick(item[0].collectionId , 'tags')}>
                                    {t('table.tags')}
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                                :t('table.description')
                            }

                        </TableHead>


                        {collection && <>
                            <TableHead className="max-w-[150px]">{t('table.theme')}</TableHead>
                            <TableHead className="max-w-[150px]">{t('table.items')}</TableHead>
                        </>}
                        {item && custom_fields && <>
                        {fields.map(field=>(
                            custom_fields[field].map((header,i) => (
                                <TableHead className="max-w-[150px] text-center">
                                    <Button
                                        variant="ghost"
                                        onClick={() =>handleSortClick(item[0].collectionId , "$custom_fields."+field,i)}>
                                        {header}
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>))
                         ))}
                        </>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {collection && collection.map(item => {
                        return (<TableRow key={item._id}>
                                {id && <TableCell>
                                    <Input type="checkbox" className="w-4" onClick={() => selectCollection(item._id)}
                                           checked={id.includes(item._id)}></Input>
                                </TableCell>}
                                <TableCell className="">
                                    <NavLink to={"/collection/" + item._id}>
                                        <img src={item.photo ? item.photo : '/placeholder.png'}
                                             className="w-11 h-11 border-2 border-gray-100 rounded object-contain"
                                             loading={"lazy"}/>
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
                                <TableCell>{item.items && item.items.length}</TableCell>
                            </TableRow>)
                    })}
                    {item && item.length > 0 && custom_fields && item.map(data => {
                        return (<TableRow key={data._id}>
                            {id && <TableCell>
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
                            <TableCell>{data.tags && data.tags.map(tag => (<span>{tag }</span>))}</TableCell>

                            {custom_fields.custom_int.map((_item, i) => (<TableCell
                                    className="max-w-[150px] text-center">{data.custom_fields.custom_int[i]}</TableCell>))}
                            {custom_fields.custom_string.map((_item, i) => (<TableCell
                                    className="max-w-[150px] text-center">{data.custom_fields.custom_string[i]}</TableCell>))}
                            {custom_fields.custom_boolean.map((_item, i) => (<TableCell
                                    className="max-w-[150px] text-center">{'' + !!data.custom_fields.custom_boolean[i]}</TableCell>))}
                            {custom_fields.custom_date.map((_item, i) => (<TableCell
                                    className="max-w-[150px] text-center">{data.custom_fields.custom_date[i]}</TableCell>))}

                        </TableRow>)
                    })}
                </TableBody>
            </Table>
        </div>);
}