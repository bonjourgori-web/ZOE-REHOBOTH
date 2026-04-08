import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Star, Quote } from "lucide-react";
import { LanguageContext } from "../App";

const API = process.env.REACT_APP_BACKEND_URL;

export default function Testimonials() {
  const { lang } = useContext(LanguageContext);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/testimonials`)
      .then(r => setTestimonials(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!testimonials.length) return null;

  return (
    <section className="zr-section zr-section--warm" id="temoignages" data-testid="testimonials-section">
      <div className="zr-section__inner">
        <div className="zr-section__header">
          <span className="zr-section__tag">
            {lang === "fr" ? "Témoignages" : "Testimonials"}
          </span>
          <h2 className="zr-section__title">
            {lang === "fr" ? "Ce que Disent nos Lecteurs" : "What Our Readers Say"}
          </h2>
          <p className="zr-section__subtitle">
            {lang === "fr"
              ? "Des vies transformées par la Parole de Dieu à travers nos publications."
              : "Lives transformed by the Word of God through our publications."}
          </p>
        </div>

        <div className="zr-testimonials-grid" data-testid="testimonials-grid">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id || i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }) {
  return (
    <div className="zr-testi-card" data-testid="testimonial-card">
      {/* Quote icon */}
      <div className="zr-testi-card__quote">
        <Quote size={24} fill="currentColor" />
      </div>

      {/* Stars */}
      <div className="zr-testi-card__stars">
        {[1, 2, 3, 4, 5].map(s => (
          <Star
            key={s}
            size={14}
            fill={s <= (t.stars || 5) ? "#D4AF37" : "none"}
            color={s <= (t.stars || 5) ? "#D4AF37" : "#ccc"}
          />
        ))}
      </div>

      {/* Text */}
      <p className="zr-testi-card__text">"{t.text}"</p>

      {/* Author info */}
      <div className="zr-testi-card__footer">
        <div className="zr-testi-card__avatar">
          {t.name.charAt(0).toUpperCase()}
        </div>
        <div className="zr-testi-card__info">
          <span className="zr-testi-card__name">{t.name}</span>
          <span className="zr-testi-card__location">{t.location}</span>
        </div>
      </div>

      {/* Book badge */}
      <div className="zr-testi-card__book">
        <span className="zr-testi-card__book-label">{t.book}</span>
      </div>
    </div>
  );
}
