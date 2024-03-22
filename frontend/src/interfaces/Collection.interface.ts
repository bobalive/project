import {ItemInterface} from "./Item.interface.ts";
import { CustomFiedNameInteface} from "./CustomFied.inteface.ts";



export interface CollectionInterface {
    _id:string;
    userId: string;
    name: string;
    theme?: "Books" | "Signs" | "Silverware";
    description:string;
    photo?: string;
    custom_fields: CustomFiedNameInteface;
    items?: ItemInterface[];
}

// Example usage
