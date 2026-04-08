import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import VerseduJour from "./components/VerseduJour";
import Catalogue from "./components/Catalogue";
import Auteurs from "./components/Auteurs";
import Agenda from "./components/Agenda";
import VideoSection from "./components/VideoSection";
import Distribution from "./components/Distribution";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

export const LanguageContext = createContext({ lang: "fr", setLang: () => {} });

function LandingPage() {
  const [lang, setLang] = useState("fr");
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div className="zr-app">
        <Header />
        <main>
          <Hero />
          <VerseduJour />
          <Catalogue />
          <Testimonials />
          <Auteurs />
          <Agenda />
          <VideoSection />
          <Distribution />
        </main>
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}

function ProtectedRoute({ children }) {
  const { admin } = useAuth();
  if (admin === undefined) return <div className="zr-admin-loading">Chargement...</div>;
  if (!admin) return <Navigate to="/admin" replace />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute><AdminDashboard /></ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function AdminLoginPage() {
  const { admin } = useAuth();
  if (admin === undefined) return <div className="zr-admin-loading">Chargement...</div>;
  if (admin) return <Navigate to="/admin/dashboard" replace />;
  return <AdminLogin />;
}

export default App;
