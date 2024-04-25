import React from "react";
import Sidebar from "./Sidebar.jsx";
import Graph from "./Graph.jsx";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="container p-8 w-full md:w-4/5">
        <Graph />
      </div>
    </div>
  );
};

export default Dashboard;
