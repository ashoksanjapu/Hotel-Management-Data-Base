import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styling/adminLogin.css'; // Assuming you have a separate CSS for admin

const AdminLogin = () => {
  const [email, setEmail] = useState(""); // Assume admins login with email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const url = "http://localhost:3000/admin"; // The endpoint might be different for admins

  const loginSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${url}/login`, {
      email: email,
      password: password,
    }).then((response) => {
      console.log(response);
      if (response.data.message === "Admin logged in successfully") {
        localStorage.setItem("admin_id", response.data.admin_id);
        navigate("/admin/dashboard"); // Direct the admin to the admin dashboard
      } else {
        alert("Login failed, please check your credentials.");
      }
    }).catch(error => {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    });
  };

  return (
    <div className="admin-container">
      <div className="admin-login-card">
        <h2>Admin Login</h2>
        <form onSubmit={loginSubmit}>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            id="email"
            name="email"
            required
          />

          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            id="password"
            name="password"
            required
          />
          <div className="button-container">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
            <Link to="/" className="btn btn-secondary">
              Back to User Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
