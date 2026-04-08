import React, { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../App";
import { translations } from "../translations";
import { Menu, X, Globe } from "lucide-react";

export default function Header() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.catalogue, href: "#catalogue" },
    { label: t.nav.authors, href: "#auteurs" },
    { label: t.nav.agenda, href: "#agenda" },
    { label: t.nav.distribution, href: "#distribution" },
  ];

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      data-testid="main-header"
      className={`zr-header ${scrolled ? "zr-header--scrolled" : ""}`}
    >
      <div className="zr-header__inner">
        {/* Logo */}
        <div className="zr-logo" data-testid="logo">
          <img
            src="/images/logo.jpg"
            alt="Zoe & Rehoboth Editions"
            className="zr-logo__img"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <span className="zr-badge" data-testid="sponsored-badge">
            {t.badge}
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="zr-nav" data-testid="desktop-nav">
          {navLinks.map((link) => (
            <button
              key={link.href}
              className="zr-nav__link"
              onClick={() => scrollTo(link.href)}
              data-testid={`nav-${link.href.replace("#", "")}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right controls */}
        <div className="zr-header__controls">
          <button
            className="zr-lang-switch"
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            data-testid="lang-switch"
          >
            <Globe size={15} />
            <span>{lang === "fr" ? "EN" : "FR"}</span>
          </button>
          <button
            className="zr-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="mobile-menu-btn"
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="zr-mobile-menu" data-testid="mobile-menu">
          {navLinks.map((link) => (
            <button
              key={link.href}
              className="zr-mobile-menu__link"
              onClick={() => scrollTo(link.href)}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
