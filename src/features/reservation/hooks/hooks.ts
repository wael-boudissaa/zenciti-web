import { apiGet, apiPut } from "../../../api/api"


export type ReservationUpcoming = {
    idReservation: string;
    firstName: string;
    lastName: string;
    numberOfPeople: number;
    date: string;
    time: string;
    idTable: string;
}
export type Reservaitons = {
    idReservation: string;
    timeFrom: string;
    fullName: string;
    tableId: string;
    numberOfPeople: number;
    status: string;
    createdAt: string;
}
export type ApiResponse = {
    reservations: Reservaitons[];
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrevious: boolean;
};
export type Order = {
    idOrder: string;
    totalPrice: number;
    createdAt: string;
    itemCount: number;
};

export type ReservationDetails = {
    idReservation: string;
    timeFrom: string;
    numberOfPeople: number;
    status: string;
    createdAt: string;
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    totalVisits: number;
    averageSpending: number;
    totalSpent: number;
    favoriteFood: string;
    totalOrders: number;
    orders: Order[];
};

export function getReservationDetails(idReservation: string) {
    return apiGet<ReservationDetails>(`/reservation/${idReservation}/details`);
}

export function getUpcomingReservation(idRestaurant: string) {
    return apiGet<ReservationUpcoming[]>(`/reservation/upcoming/${idRestaurant}`)
}
export function getRestaurantReservations(
    idRestaurant: string,
    page: number = 1
) {
    return apiGet<ApiResponse>(`/restaurant/${idRestaurant}/reservations?page=${page}`);
}
export function changeReservationStatus(
    idReservation: string,
    status: string
) {
    return apiPut<string>(`/reservation/${idReservation}/status`, { status });
}
