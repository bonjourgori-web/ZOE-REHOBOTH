import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../App";
import { getDailyVerse } from "../data/verses";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { verses } from "../data/verses";

export default function VerseduJour() {
  const { lang } = useContext(LanguageContext);
  const [verse, setVerse] = useState(getDailyVerse());
  const [index, setIndex] = useState(
    verses.indexOf(getDailyVerse())
  );
  const [visible, setVisible] = useState(true);

  const changeVerse = (newIndex) => {
    setVisible(false);
    setTimeout(() => {
      setIndex(newIndex);
      setVerse(verses[newIndex]);
      setVisible(true);
    }, 350);
  };

  const prev = () => changeVerse((index - 1 + verses.length) % verses.length);
  const next = () => changeVerse((index + 1) % verses.length);

  // Auto-scroll every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => {
          const ni = (i + 1) % verses.length;
          setVerse(verses[ni]);
          return ni;
        });
        setVisible(true);
      }, 350);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date().toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <section className="zr-verse-section" data-testid="verse-section">
      <div className="zr-verse-inner">
        {/* Header row */}
        <div className="zr-verse-header">
          <div className="zr-verse-label">
            <BookOpen size={14} />
            <span>{lang === "fr" ? "Verset du Jour" : "Verse of the Day"}</span>
          </div>
          <span className="zr-verse-date">{today}</span>
        </div>

        {/* Verse content */}
        <div className={`zr-verse-content ${visible ? "zr-verse--visible" : "zr-verse--hidden"}`}>
          <blockquote className="zr-verse-text" data-testid="verse-text">
            <span className="zr-verse-quote-mark">"</span>
            {lang === "fr" ? verse.fr : verse.en}
            <span className="zr-verse-quote-mark">"</span>
          </blockquote>
          <cite className="zr-verse-ref" data-testid="verse-ref">
            — {lang === "fr" ? verse.ref : verse.ref_en}
          </cite>
        </div>

        {/* Navigation */}
        <div className="zr-verse-nav">
          <button
            className="zr-verse-nav__btn"
            onClick={prev}
            aria-label="Verset précédent"
            data-testid="verse-prev-btn"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="zr-verse-dots">
            {[0, 1, 2, 3, 4].map((dot) => (
              <span
                key={dot}
                className={`zr-verse-dot ${dot === index % 5 ? "zr-verse-dot--active" : ""}`}
              />
            ))}
          </div>
          <button
            className="zr-verse-nav__btn"
            onClick={next}
            aria-label="Verset suivant"
            data-testid="verse-next-btn"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
