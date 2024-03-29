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
        <Card key={itemId}>
            <CardHeader>
                <CardTitle>"{itemName}"</CardTitle>
                <CardDescription>{t('latest_item_card.from_collection')} "{collectionName}"</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{t('latest_item_card.by')} "{userName}"</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <NavLink to={"/item/"+itemId} className='dark:bg-gray-50 dark:text-black p-2 rounded bg-gray-950 text-white '>{t('latest_item_card.view_item')}</NavLink>
            </CardFooter>
        </Card>
    )
}