import {store} from "../Store/redux-store.ts";

export interface UserInteface {
    _id:string
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    status: 'blocked' | 'active';
}
export type AppDispatch = typeof store.dispatch