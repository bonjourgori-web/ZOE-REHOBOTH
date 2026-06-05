import React, { useContext } from "react";
import { LanguageContext } from "../App";
import { translations } from "../translations";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].hero;

  const scrollToCatalogue = () => {
    const el = document.querySelector("#catalogue");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.querySelector("#distribution");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="zr-hero" data-testid="hero-section">
      {/* Background — colombe divine */}
      <div className="zr-hero__bg">
        <img
          src="/images/dove_hero.jpg"
          alt="ZOE & REHOBOTH — Éditions chrétiennes"
          className="zr-hero__bg-img"
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div className="zr-hero__overlay" />
        {/* Rayons lumineux CSS */}
        <div className="zr-hero__rays" aria-hidden="true" />
      </div>

      {/* Branding monumental ZOE & REHOBOTH */}
      <div className="zr-hero__brand-wrap" aria-hidden="true">
        <span className="zr-hero__brand-bg-text">ZOE</span>
        <span className="zr-hero__brand-bg-amp">&amp;</span>
        <span className="zr-hero__brand-bg-text">REHOBOTH</span>
      </div>

      {/* Contenu principal */}
      <div className="zr-hero__content">
        {/* Croix ornementale */}
        <div className="zr-hero__cross animate-fadeInUp">✝</div>

        {/* Titre principal stylisé */}
        <div className="zr-hero__brand-title animate-fadeInUp animate-delay-1">
          <span className="zr-hero__brand-zoe">ZOE</span>
          <span className="zr-hero__brand-sep"> &amp; </span>
          <span className="zr-hero__brand-rehoboth">REHOBOTH</span>
        </div>

        {/* Sous-titre éditeur */}
        <div className="zr-hero__edition animate-fadeInUp animate-delay-1">
          <span className="zr-hero__edition-line" />
          <span className="zr-hero__edition-text">ÉDITIONS</span>
          <span className="zr-hero__edition-line" />
        </div>

        <span className="zr-hero__tag animate-fadeInUp animate-delay-2">{t.tag}</span>

        <p className="zr-hero__subtitle animate-fadeInUp animate-delay-2">
          {t.subtitle}
        </p>

        <div className="zr-hero__actions animate-fadeInUp animate-delay-3">
          <button
            className="zr-btn zr-btn--gold"
            onClick={scrollToCatalogue}
            data-testid="hero-cta-catalogue"
          >
            {t.cta_primary}
          </button>
          <button
            className="zr-btn zr-btn--outline-light"
            onClick={scrollToContact}
            data-testid="hero-cta-contact"
          >
            {t.cta_secondary}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="zr-hero__scroll"
        onClick={scrollToCatalogue}
        aria-label="Scroll down"
        data-testid="hero-scroll-btn"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
}
