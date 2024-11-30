import React from "react";
import Deals from "./deals";
import Dashboard from "./dashboard";
import QuickServices from "./quickServices";

const Main = () => {
  return (
    <div className="p-2">
      <h1 className="text-2xl font-extrabold px-2 py-2">Dashboard</h1>
      <Deals />
      <Dashboard />
      <QuickServices />
    </div>
  );
};

export default Main;
