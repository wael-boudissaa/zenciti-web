import React from "react";
import StaffCard from "./StaffCard";

const StaffGrid = ({ staffList, onViewReview }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
    {staffList.map((staff) => (
      <StaffCard
        key={staff.id || staff.idRestaurantWorker}
        staff={staff}
        onViewReview={() => onViewReview(staff)}
      />
    ))}
  </div>
);

export default StaffGrid;

