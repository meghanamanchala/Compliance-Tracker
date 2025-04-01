import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./dashboard/AdminDashboard";
import AuditorDashboard from "./dashboard/AuditorDashboard";
import Navbar from "./pages/Navbar";

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [page, setPage] = useState("login"); // "login" or "register"

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
    setPage("login");
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar userRole={userRole} onLogout={handleLogout} onPageChange={setPage} />
      {!userRole ? (
        page === "login" ? <Login onLogin={setUserRole} onPageChange={setPage} /> : <Register onPageChange={setPage} />
      ) : userRole === "admin" ? (
        <AdminDashboard />
      ) : (
        <AuditorDashboard />
      )}
    </div>
  );
};

export default App;
