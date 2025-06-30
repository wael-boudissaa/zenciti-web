import { apiGet, apiPost, apiPut } from "../../../api/api";

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
export type Menu = {
    idMenu: string;
    idRestaurant: string;
    name: string;
    active: boolean;
    createdAt: string;
}

export type FoodCategory = {
    idCategory: string;
    nameCategorie: string;
}
export type FoodByMenu = {
    idFood: string;
    name: string;
    description: string;
    idMenu: string;
    price: number;
    image: string;
    status: "available" | "unavailable";
    idCategory: string; // Assuming category is a string, adjust if it's an object
}
export type MenuStats = {
    totalMenus: number;
    activeMenuName: string;
    totalItems: number;
    totalCategories: number;
    availableFoods: number;
    unavailableFoods: number;
    popularFoods: PopularFood[];
}
export type PopularFood = {
    foodName: string;
    orderCount: number;

}
export type RestaurantWorker = {
    idRestaurantWorker: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    quote: string;
    startWorking: string; // ISO date string
    nationnallity: string;
    nativeLanguage: string;
    rating: number;
    image: string | null;
    address: string;
    status: "active" | "inactive" | string; // adjust status enum as needed
    idRestaurant: string;
    recentRatings: {
        ratingValue: number;
        comment: string;
        createdAt: string; // ISO date string
        clientFirstName: string;
        clientLastName: string;
    }[];
    ratingStats: {
        totalRatings: number;
        averageRating: number;
        percentage5Stars: number;
        percentage4Stars: number;
        percentage3Stars: number;
        percentage2Stars: number;
        percentage1Star: number;
    };
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

export function getMenuRestaurant(idRestaurant: string) {
    return apiGet<Menu[]>(`/menu/restaurant/${idRestaurant}`);
}

export function getCategoryFoodOfRestaurant(idRestaurant: string) {
    return apiGet<FoodCategory[]>(`/food/category/${idRestaurant}`);
}

export function getFoodByMenu(idMenu: string) {
    return apiGet<FoodByMenu[]>(`/food/${idMenu}`); // Adjust the type as needed
}

export function getFoodOfMenuActive(idRestaurant: string) {
    return apiGet<FoodByMenu[]>(`/food/active/${idRestaurant}`); // Adjust the type as needed
}
export function getMenuStats(idRestaurant: string) {
    return apiGet<MenuStats>(`/restaurant/menu/stats/${idRestaurant}`);
}
export function onCreateMenu(idRestaurant: string, name: string) {
    return apiPost<any>(`/menu`, { name, idRestaurant });
}
export function getFoodOfRestaurant(idRestaurant: string) {
    return apiGet<FoodByMenu[]>(`/restaurant/food/${idRestaurant}`); // Adjust the type as needed
}

export function addFoodToMenu(idMenu: string, idFood: string) {
    return apiPost<any>(`/restaurant/addfood/${idMenu}`, { idFood });
}

export function setFoodUnavailable(idFood: string) {
    return apiPut(`/food/${idFood}/status`, { status: "unavailable" })
}
export function setFoodAvailable(idFood: string) {
    return apiPut(`/food/${idFood}/status`, { status: "available" })
}


export async function createRestaurantWorker(idRestaurant: string, formData: FormData) {
    return apiPost(`/restaurant/worker/${idRestaurant}`, formData, {
        // do not set headers here
    });
}
export async function createFood(formData: FormData) {
    return apiPost(`/food`, formData, {
        // do not set headers here
    });
}

export async function ActivateMenu(idMenu: string, idRestaurant: string) {
    return apiPut<string>(`/menu/${idMenu}/activate/${idRestaurant}`);
}

export async function getRestaurantWorkerDetails(idRestaurantWorker: string) {
    return apiGet<RestaurantWorker>(`/worker/${idRestaurantWorker}/details`);
}
