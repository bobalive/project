export interface CreateCollectionsInterface {
    name:string,
    theme?: "Books" | "Signs" | "Silverware";
    description:string;
    photo?: string;
}