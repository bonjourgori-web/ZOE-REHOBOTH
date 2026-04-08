import React, { useContext, useEffect, useState, useCallback } from "react";
import { LanguageContext } from "../App";
import { verses } from "../data/verses";
import { BookOpen, RefreshCw } from "lucide-react";

const getRandomVerse = () => verses[Math.floor(Math.random() * verses.length)];

export default function VerseduJour() {
  const { lang } = useContext(LanguageContext);
  const [verse, setVerse] = useState(getRandomVerse);
  const [visible, setVisible] = useState(true);
  const [spinning, setSpinning] = useState(false);

  const changeVerse = useCallback(() => {
    setVisible(false);
    setSpinning(true);
    setTimeout(() => {
      setVerse(getRandomVerse());
      setVisible(true);
      setSpinning(false);
    }, 350);
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
        <div
          className={`zr-verse-content ${visible ? "zr-verse--visible" : "zr-verse--hidden"}`}
          data-testid="verse-content"
        >
          <blockquote className="zr-verse-text" data-testid="verse-text">
            <span className="zr-verse-quote-mark">"</span>
            {lang === "fr" ? verse.fr : verse.en}
            <span className="zr-verse-quote-mark">"</span>
          </blockquote>
          <cite className="zr-verse-ref" data-testid="verse-ref">
            — {lang === "fr" ? verse.ref : verse.ref_en}
          </cite>
        </div>

        {/* CTA Button */}
        <button
          className={`zr-verse-refresh ${spinning ? "zr-verse-refresh--spinning" : ""}`}
          onClick={changeVerse}
          data-testid="verse-refresh-btn"
          aria-label={lang === "fr" ? "Nouveau verset" : "New verse"}
        >
          <RefreshCw size={15} />
          <span>{lang === "fr" ? "Nouveau Verset" : "New Verse"}</span>
        </button>
      </div>
    </section>
  );
}
