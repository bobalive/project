import {Tabs} from "@radix-ui/react-tabs";
import {useLatestItems} from "../../../CustomHooks/useLatestItems.tsx";
import {LatestItemCard} from "./LatestItemCard/LatestItemCard.tsx";

export const LatestItems = ()=>{
    const latestItem = useLatestItems()

    console.log(latestItem)
    return(
        <Tabs>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {latestItem?.map(item=>(
                    <LatestItemCard itemId={item._id} itemName={item.name} collectionName={item.collectionName} userName={item.userName}></LatestItemCard>
                ))}
                </div>
        </Tabs>
    )
}