import { apiPost } from "../../../api/api";
import type { Menu } from "./hooks";

export function onCreateMenu(idRestaurant: string, name: string) {
    return apiPost<Menu>(`/menu/${idRestaurant}`);
}

