import { apiGet, apiPost } from "../../../api/api";



// Define types as needed
export type UserSignIn = { email: string; password: string; };

export type Data = {
    token: string;
    user: User;
}
export type User = {
    idProfile: string;
    firstName: string;
    lastName: string;
    type: "adminRestaurant" | "clientRestaurant" | "adminClient" | "client";
    email: string;
    address: string;
    phone: string;
    password: string;
    lastLogin: string;
    createdAt: string;
    idRestaurant: string;
    idAdminRestaurant: string;
}
export function getUser(id: string) {
    return apiGet<User>(`/api/users/${id}`);
}

export function signInAdmin(data: UserSignIn) {
    return apiPost<Data, UserSignIn>("/admin/login", data);
}
