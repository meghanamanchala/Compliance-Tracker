import React from "react";

const Navbar = ({ userRole, onLogout, onPageChange }) => {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <div className="text-lg font-bold">Compliance Tracker</div>
      <div>
        {userRole ? (
          <button onClick={onLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        ) : (
          <>
            <button onClick={() => onPageChange("login")} className="bg-green-500 px-4 py-2 rounded mr-2">Login</button>
            <button onClick={() => onPageChange("register")} className="bg-yellow-500 px-4 py-2 rounded">Register</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
