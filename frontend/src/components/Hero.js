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
      {/* Background image */}
      <div className="zr-hero__bg">
        <img
          src="/images/image8.jpeg"
          alt="ZOE & REHOBOTH"
          className="zr-hero__bg-img"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div className="zr-hero__overlay" />
      </div>

      {/* Content */}
      <div className="zr-hero__content">
        <span className="zr-hero__tag animate-fadeInUp">{t.tag}</span>
        <h1 className="zr-hero__title animate-fadeInUp animate-delay-1">
          {t.title}
        </h1>
        <p className="zr-hero__subtitle animate-fadeInUp animate-delay-2">
          {t.subtitle}
        </p>
        <div className="zr-hero__actions animate-fadeInUp animate-delay-3">
          <button
            className="zr-btn zr-btn--primary"
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
