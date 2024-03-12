export interface UserInteface {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    status: 'blocked' | 'active';
}