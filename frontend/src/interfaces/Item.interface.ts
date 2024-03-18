export interface ItemInterface {
    _id:string
    collectionId: string;
    userId: string;
    name: string;
    tags?: string[];
    fields: { name: string; value: string }[];
    сustom_fields?: { name: string; value: string }[];
}
