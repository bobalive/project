import axios, {AxiosResponse} from "axios";
import {CollectionInterface} from "../interfaces/Collection.interface.ts";

export const getTopCollections = async (): Promise<CollectionInterface[]> => {
    try {
        const response: AxiosResponse<CollectionInterface[]> = await axios.get("http://localhost:5000/api/collections/top");

        if (response.status === 200) {
            return response.data;
        } else {
            // Handle other HTTP status codes or errors if needed
            throw new Error(`Failed to fetch top collections. Status code: ${response.status}`);
        }
    } catch (error) {
        // Handle network errors or exceptions
        console.error("Error fetching top collections:", error);
        throw error;
    }
};