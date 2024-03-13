export interface LoginInterface{
    email:string
    password:string
}

export interface SigninInterface extends LoginInterface{
    name:string
}