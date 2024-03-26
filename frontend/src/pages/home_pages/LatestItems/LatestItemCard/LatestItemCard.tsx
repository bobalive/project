import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "../../../../components/ui/card.tsx";
import {NavLink} from "react-router-dom";
import {LatesItemsCardInterface} from "./LatesItemsCardInterface.ts";
import {useTranslation} from "react-i18next";

export const LatestItemCard = ({itemName , collectionName , itemId, userName}:LatesItemsCardInterface)=>{
    const { t } = useTranslation(); // Initialize the useTranslation hook

    return(
        <Card>
            <CardHeader>
                <CardTitle>"{itemName}"</CardTitle>
                <CardDescription>{t('latest_item_card.from_collection')} "{collectionName}"</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{t('latest_item_card.by')} "{userName}"</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <NavLink to={"/item/"+itemId} className='bg-gray-50 text-black p-2 rounded'>{t('latest_item_card.view_item')}</NavLink>
            </CardFooter>
        </Card>
    )
}