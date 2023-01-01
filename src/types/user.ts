import { Entity } from "./common";

export interface User extends Entity{
    name: string,
    email: string,
    password: string,
    role: string,
    avatar: string,
    /* complete User interface with some chosen properties */
}
