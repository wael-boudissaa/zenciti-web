import { apiGet } from "../../../api/api";

export interface HourlyReservationStats {
  [hour: string]: number;
}

export interface StatusReservationStats {
  [status: string]: number;
}

export interface ReservationAnalyticsResponse {
  hourlyStats: HourlyReservationStats;
  statusStats: StatusReservationStats;
}

export interface ReservationStatsResponse {
  totalToday: number;
  upcomingReservation: number;
  confirmedRate: number;
  todayReservations: ReservationDetailsR[];
  upcomingReservations: ReservationDetailsR[];
}

export interface ReservationDetailsR {
  firstName: string;
  lastName: string;
  timeFrom: string;
  numberOfPeople: number;
}

export interface TodayReservation {
  idReservation: string;
  timeFrom: string;
  fullName: string;
  tableId: string;
  numberOfPeople: number;
  status: string;
  createdAt: string;
}

export function getRestaurantReservationAnalytics(idRestaurant: string) {
  return apiGet<ReservationAnalyticsResponse>(`/reservation/analytics/${idRestaurant}`);
}

export function getReservationStats(idRestaurant: string) {
  return apiGet<ReservationStatsResponse>(`/reservation/stats/${idRestaurant}`);
}

export function getTodayReservations(idRestaurant: string) {
  return apiGet<TodayReservation[]>(`/reservation/today/${idRestaurant}`);
}