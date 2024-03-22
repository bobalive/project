export interface UserInteface {
    _id:string
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    status: 'blocked' | 'active';
}