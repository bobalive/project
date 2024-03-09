import {ItemInterface} from "./Item.interface.ts";

interface CustomField {
    name: string;
    state?: boolean;
}


export interface CollectionInterface {
    userId: string;
    name: string;
    theme?: "Books" | "Signs" | "Silverware";
    photo?: string;
    custom_Fields: {
        custom_string: CustomField[];
        custom_int: CustomField[];
        custom_boolean: CustomField[];
        custom_date: CustomField[];
    };
    items: ItemInterface[];
}

// Example usage
