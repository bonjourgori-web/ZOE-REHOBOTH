import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(undefined); // undefined = loading

  useEffect(() => {
    const token = localStorage.getItem("zr_admin_token");
    if (!token) { setAdmin(null); return; }
    axios.get(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => setAdmin(r.data))
      .catch(() => { localStorage.removeItem("zr_admin_token"); setAdmin(null); });
  }, []);

  const login = async (email, password) => {
    const r = await axios.post(`${API}/api/auth/login`, { email, password });
    localStorage.setItem("zr_admin_token", r.data.token);
    setAdmin({ email: r.data.email, role: r.data.role });
    return r.data;
  };

  const logout = () => {
    localStorage.removeItem("zr_admin_token");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function getAuthHeader() {
  const token = localStorage.getItem("zr_admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
