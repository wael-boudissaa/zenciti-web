import { apiGet } from "../../../api/api";

type RestaurantInformation = {

    idRestaurant: string;
    idAdminRestaurant: string;
    name: string;
    image: string;
    description: string;
    capacity: number;
    location: string;

}

export type Review = {
    firstName: string;
    lastName: string;
    comment: string;
    rating: number;
    createdAt: string;



}
export type StaffMember = {
    idRestaurantWorker: string;
    idRestaurant: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    quote: string;
    startWorking: string;
    nationnallity: string;
    nativeLanguage: string;
    rating: number;
    address: string;
    status: "active" | "inactive" | "on leave";
}
export type MonthlyRatingStats = {
    month: number;
    year: number;
    averageRating: number;
    totalRatings: number;
};

export type RestaurantRatingStats = {
    monthlyStats: MonthlyRatingStats[];
    overallAverage: number;
    totalRatings: number;
    percentage5Stars: number;
    percentage4Stars: number;
    percentage3Stars: number;
    percentage2Stars: number;
    percentage1Star: number;
};


export function getRestaurantInformation(idRestaurant: string) {
    return apiGet<RestaurantInformation>(`/restaurant/${idRestaurant}`);
}

export function getRecentReviews(idRestaurant: string) {
    return apiGet<Review[]>(`/reviews/${idRestaurant}`);
}


export function getRestaurantStaff(idRestaurant: string) {
    return apiGet<StaffMember[]>(`/restaurant/workers/${idRestaurant}`);
}

export function getRestaurantStats(idRestaurant: string) {
    return apiGet<RestaurantRatingStats>(`/restaurant/stats/${idRestaurant}`);
}
