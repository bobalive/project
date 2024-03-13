export interface UserInteface {
    id:string
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    status: 'blocked' | 'active';
}