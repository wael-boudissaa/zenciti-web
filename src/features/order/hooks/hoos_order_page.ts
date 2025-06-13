import { apiGet } from "../../../api/api";

export interface HourlyStats {
  [hour: string]: number;
}

export interface RecentOrder {
  idOrder: string;
  idClient:string;
  firstName: string;
  lastName: string;
  createdAt: string;
  itemCount: number;
  totalPrice: number;
  status: string;
}

export interface StatusStats {
  [status: string]: number;
}

export interface OrdersStatsResponse {
    hourlyStats: HourlyStats;
    recentOrders: RecentOrder[];
    statusStats: StatusStats;
}


export function getRestaurantOrderInformation(idRestaurant: string) {
    return apiGet<OrdersStatsResponse>(`/wael/${idRestaurant}`);
}

