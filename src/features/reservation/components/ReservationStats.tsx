import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faCalendarWeek,
  faUsers,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { getReservationStats, getTodayReservations, type ReservationStatsResponse, type TodayReservation } from "../hooks/hook_reservation_stats";

interface Props {
  loading: boolean;
  idRestaurant: string;
}

export default function ReservationStats({ loading, idRestaurant }: Props) {
  const [reservationStats, setReservationStats] = useState<ReservationStatsResponse | null>(null);
  const [todayReservations, setTodayReservations] = useState<TodayReservation[]>([]);

  useEffect(() => {
    async function fetchStats() {
      if (!idRestaurant) return;
      
      try {
        const [statsResult, todayResult] = await Promise.all([
          getReservationStats(idRestaurant),
          getTodayReservations(idRestaurant)
        ]);
        
        if (statsResult) {
          setReservationStats(statsResult);
        }
        if (todayResult) {
          setTodayReservations(todayResult);
        }
      } catch (error) {
        console.error("Error fetching reservation stats:", error);
      }
    }
    
    fetchStats();
  }, [idRestaurant]);

  // Calculate total guests today from today's reservations
  const totalGuestsToday = todayReservations.reduce((sum, reservation) => sum + reservation.numberOfPeople, 0);

  const stats = [
    {
      icon: faCalendarDay,
      label: "Today's Reservations",
      value: reservationStats?.totalToday || 0,
    },
    {
      icon: faCalendarWeek,
      label: "Upcoming (7 Days)",
      value: reservationStats?.upcomingReservation || 0,
    },
    {
      icon: faUsers,
      label: "Total Guests Today",
      value: totalGuestsToday,
    },
    {
      icon: faCheckCircle,
      label: "Confirmed Rate",
      value: reservationStats ? `${Math.round(reservationStats.confirmedRate)}%` : "0%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm p-5 flex items-center">
          <div className="bg-light rounded-lg p-3 mr-4">
            <FontAwesomeIcon icon={stat.icon} className="text-primary text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <h3 className="text-2xl font-bold">{loading ? "..." : stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

