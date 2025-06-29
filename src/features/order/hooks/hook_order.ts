import { apiGet, apiPut } from "../../../api/api";

export interface FoodItem {
    name: string;
    priceSingle: number;
    quantity: number;
}

export interface Order {
    idOrder: string;
    createdAt: string;
    status: string;
    foodItems: FoodItem[];
    totalPrice: number;
}
export type PopulaireFood = {
    idFood: string;
    name: string;
    image: string;
    total: number;
}

export interface Profile {
    idProfile: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
}

export interface CustomerOrderInformation {
    Profile: Profile;
    Orders: Order[];
    TotalSpent: number;
    TotalOrders: number;
    FirstOrderDate: string;
}
export type FoodItems = {
    idFood: string;
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    subtotal: number;
}
export type OrderInformation = {
    idOrder: string;
    totalPrice: number;
    status: string;
    createdAt: string;
    clientFirstName: string;
    clientLastName: string;
    clientEmail: string;
    clientPhone: string;
    clientAddress: string;
    clientUsername: string;
    reservationTime: string;
    numberOfPeople: number;
    foodItems: FoodItems[];
}

export interface CustomerOrderInformationResponse {
    data: CustomerOrderInformation;
    status: number;
}
export function getCustomerOrderInformation(idClient: string) {
    return apiGet<CustomerOrderInformation>(`/waela/${idClient}`);
}
export function getPopularFood(idRestaurant: string) {
    return apiGet<PopulaireFood[]>(`/restaurant/food/populair/${idRestaurant}`);
}

export function getOrderDetails(idOrder: string) {
    return apiGet<OrderInformation>(`/order/${idOrder}`);
}

export function putOrderStatus(idOrder: string, status: string) {
    return apiPut<string>(`/order/${idOrder}/status`, { status });
}
