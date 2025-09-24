import React from "react";
import Issues from "../modules/issues/components/issues";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <Issues />
      </div>
    </ProtectedRoute>
  );
};

export default page;
