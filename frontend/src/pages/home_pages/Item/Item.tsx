import {NavLink, useParams} from "react-router-dom";
import {CustomFields} from "../../../components/CustomFields/CustomField.tsx";
import {useSetItem} from "../../../CustomHooks/useSetItem.tsx";
import {useGetItemInfo} from "../../../CustomHooks/useGetItemInfo.tsx";
import {Navigation} from "../../../components/Navigation/Navigation.tsx";
import {Comments} from "../../../components/Comments/Comments.tsx";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import {auth} from "../../../Store/Slices/userSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../interfaces/User.interface.ts";


export const Item = () => {


    const {id} = useParams<string>()
    const item = useSetItem(id)
    const {custFields} = useGetItemInfo(id)
    const {t} = useTranslation()

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(auth())
    }, []);


    return (
        <>
        {item?._id
            ? <div className="w-full mx-auto p-2">
                <Navigation itemId={item._id} collectionId={item.collectionId} userId={item.usrId}/>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">{t('item.itemTitle', {itemName: item.name})}</h1>
                    <p className="text-sm text-gray-600">{t('item.itemId', {itemId: item._id})}</p>
                    <NavLink to={'/collection/' + item.collectionId}
                             className="text-sm text-gray-600">{t('item.collectionLink', {collectionName: item.collectionName})}</NavLink>
                    <p className="text-sm text-gray-600">{t('item.itemAuthor', {userName: item.userName})}</p>
                </div>
                <div className="mb-6 flex items-center gap-1">
                    <h2 className="text-lg font-semibold">{t('item.tagsTitle')}</h2>
                    <div className="flex space-x-2">
                        {item.tags.map((tag) => (
                            <NavLink key={tag} className='p-4 bg-gray-500 m-2 rounded-xl' to={'/search/'+tag.slice(1,tag.length)}>{tag}</NavLink>
                        ))}
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap'>

                    {item.custom_fields.custom_string.map((field, i) => (
                        <CustomFields field={field} fieldName={custFields?.custom_string[i]}></CustomFields>
                    ))
                    }
                    {item.custom_fields.custom_int.map((field, i) => (
                        <CustomFields field={field} fieldName={custFields?.custom_int[i]}></CustomFields>
                    ))
                    }
                    {item.custom_fields.custom_boolean.map((field, i) => (
                        <CustomFields field={field} fieldName={custFields?.custom_boolean[i]}></CustomFields>
                    ))
                    }
                    {item.custom_fields.custom_date.map((field, i) => (
                        <CustomFields field={field} fieldName={custFields?.custom_date[i]}></CustomFields>
                    ))
                    }
                </div>
                {item.custom_fields.custom_multi_line[0] && item.custom_fields.custom_multi_line.map((field, i) => (
                    <div className="mb-6 flex flex-col  ">
                        <h2 className="text-2xl font-semibold mx-2 mb-4 w-[300px]">{custFields?.custom_multi_line[i]}: </h2>
                        <div className="prose prose-gray max-w-none not-italic border p-2 rounded-md">
                            <p className="text-sm block">
                                {field}
                            </p>
                        </div>
                    </div>
                ))
                }
                <Comments item={item}/>
            </div>
            :
            "loading..."

        }

        </>

    )

}