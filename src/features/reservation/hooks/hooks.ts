import { apiGet } from "../../../api/api"


export type ReservationUpcoming = {
    idReservation: string;
    firstName: string;
    lastName: string;
    numberOfPeople: number;
    date: string;
    dat: string;
    time: string;
    idTable: string;
}

export function getUpcomingReservation(idRestaurant: string) {
    return apiGet<ReservationUpcoming[]>(`/reservation/upcoming/${idRestaurant}`)
}
