import {useLatestItems} from "../../../CustomHooks/useLatestItems.tsx";
import {LatestItemCard} from "./LatestItemCard/LatestItemCard.tsx";
import {useParams} from "react-router-dom";

export const LatestItems = ()=>{
    const {query} = useParams()
    const latestItem = useLatestItems(query)

    return(

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {latestItem?.map(item=>(
                    <LatestItemCard itemId={item._id} itemName={item.name} collectionName={item.collectionName} userName={item.userName}></LatestItemCard>
                ))}
                </div>
    )
}