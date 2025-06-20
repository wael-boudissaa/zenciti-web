import { apiGet } from "../api/api";

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

export function getRestaurantInformationUsingToken(tokne: string) {
    return apiGet<User>(`/restaurant/token/${tokne}`)
}
