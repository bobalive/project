import {UserInteface} from "../../interfaces/User.interface.ts";
import {Dispatch, SetStateAction} from "react";

export interface AdminTablePropsInterface {
    users:UserInteface[],
    ids:string[],
    setIds:Dispatch<SetStateAction<string[]>>
}