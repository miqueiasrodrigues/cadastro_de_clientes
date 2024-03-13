import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <main className="main">
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
};

export default App;
