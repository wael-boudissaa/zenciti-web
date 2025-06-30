import { apiDelete, apiGet, apiPost, apiPut } from "../../../api/api";


// Define types as needed
type User = { id: string; name: string; email: string };
type UserCreate = { name: string; email: string; password: string; };

export function getUser(id: string) {
    return apiGet<User>(`/api/users/${id}`);
}

export function createUser(data: UserCreate) {
    return apiPost<User, UserCreate>("/api/users", data);
}

export function updateUser(id: string, data: Partial<UserCreate>) {
    return apiPut<User, Partial<UserCreate>>(`/api/users/${id}`, data);
}

export function deleteUser(id: string) {
    return apiDelete<void>(`/api/users/${id}`);

}

type TableShape = "square" | "circle"

export type BackendTable = {
    shape: TableShape;
    posX: number;
    posY: number;
};

export type DataTableBackend = {
    idTable: string;
    idRestaurant: string;
    shape: TableShape;
    posX: number;
    posY: number;
    is_available: boolean;
};

export function updateTableLayout(idRestaurant: string, data: BackendTable[]) {
    return apiPut<DataTableBackend>(`/restaurant/${idRestaurant}/tables/bulk`, { data });
}

