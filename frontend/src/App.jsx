import React,{useState} from "react";

import Login from "./pages/Login";
import AdminDashboard from "./dashboard/AdminDashboard";
import AuditorDashboard from "./dashboard/AuditorDashboard";
import ComplianceTracker from "./components/ComplianceTracker";

const App = () => {
  const [userRole, setUserRole] = useState(null);

  return (
    // <div className="container mx-auto p-4">
    //   {!userRole ? (
    //     <Login onLogin={setUserRole} />
    //   ) : userRole === "admin" ? (
    //     <AdminDashboard />
    //   ) : (
    //     <AuditorDashboard />
    //   )}
    // </div>
    <ComplianceTracker />
  );
};

export default App;