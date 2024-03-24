export interface ChangeUserRole {
    ids:string[]
    role:'admin'|'user'
}
export interface ChangeUserStatus{
    ids:string[]
    status:'active'|'blocked'
}