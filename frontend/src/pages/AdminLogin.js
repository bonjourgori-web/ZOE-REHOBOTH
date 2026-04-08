import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="zr-admin-login-page" data-testid="admin-login-page">
      {/* Background */}
      <div className="zr-admin-login-bg">
        <img src="/images/logo.jpg" alt="ZOE & REHOBOTH" className="zr-admin-login-logo" />
        <h1 className="zr-admin-login-title">ZOE &amp; REHOBOTH</h1>
        <p className="zr-admin-login-sub">Espace Administrateur</p>
      </div>

      {/* Card */}
      <div className="zr-admin-login-card" data-testid="admin-login-card">
        <div className="zr-admin-login-card__header">
          <LogIn size={24} className="zr-admin-login-card__icon" />
          <h2 className="zr-admin-login-card__title">Connexion Admin</h2>
          <p className="zr-admin-login-card__sub">Gérez le contenu de votre site</p>
        </div>

        <form onSubmit={handleSubmit} className="zr-admin-form">
          <div className="zr-admin-form__field">
            <label className="zr-admin-form__label">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="zr-admin-form__input"
              placeholder="admin@zoereh.com"
              required
              data-testid="admin-email-input"
            />
          </div>
          <div className="zr-admin-form__field">
            <label className="zr-admin-form__label">Mot de passe</label>
            <div className="zr-admin-form__pwd-wrap">
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="zr-admin-form__input"
                placeholder="••••••••••"
                required
                data-testid="admin-password-input"
              />
              <button
                type="button"
                className="zr-admin-form__pwd-toggle"
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="zr-admin-form__error" data-testid="admin-login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="zr-btn zr-btn--primary"
            disabled={loading}
            data-testid="admin-login-btn"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <LogIn size={16} />
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="zr-admin-login-card__back">
          <a href="/" className="zr-admin-login-card__back-link">
            ← Retour au site
          </a>
        </div>
      </div>
    </div>
  );
}
