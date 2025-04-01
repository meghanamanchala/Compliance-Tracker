import React, { useState } from "react";

const Register = ({ onPageChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("auditor"); // Default role
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://compliance-tracker-vw7x.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful! Please log in.");
        setTimeout(() => onPageChange("login"), 1500);
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input type="password" className="w-full p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Role</label>
          <select className="w-full p-2 border rounded" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="auditor">Auditor</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
