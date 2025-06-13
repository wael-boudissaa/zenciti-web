import { apiGet } from "../../../api/api";



// Define types as needed
export type ReservationListInformation = {
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    numberOfPeople?: number;
    status?: string;
};

export type DashboardCount = {
    numberReservation: number;
    numberOrders: number;

}
export type ReservationLastMonth = {
    day: string;
    reservations: number;
};

export function getReservationOfToday(idRestaurant: string) {
    return apiGet<ReservationListInformation>(`/reservation/today/${idRestaurant}`);
}

export function getDashboardCount(idRestaurant: string) {
    return apiGet<DashboardCount>(`/restaurant/count/${idRestaurant}`);
}

export function getReservationLastMonth(idRestaurant: string) {
    return apiGet<ReservationLastMonth[]>(`/reservation/month/${idRestaurant}`);
}



