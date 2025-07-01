"use client";

import React from "react";
import RoomDetail from "../modules/room/components/room";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <RoomDetail />
      </div>
    </ProtectedRoute>
  );
};

export default page;
