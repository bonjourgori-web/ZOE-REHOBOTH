import React, { useContext } from "react";
import { LanguageContext } from "../App";
import { translations } from "../translations";
import { FACEBOOK_VIDEO, FACEBOOK_PAGE, WHATSAPP_BASE } from "../data/books";
import { Play, MessageCircle, Users, Package } from "lucide-react";

export default function VideoSection() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].video;
  const trackingUrl = `${WHATSAPP_BASE}?text=${encodeURIComponent(
    lang === "fr"
      ? "Bonjour, j'ai passé une commande et je souhaite faire un suivi. Merci."
      : "Hello, I placed an order and would like to track it. Thank you."
  )}`;

  return (
    <section className="zr-section zr-section--dark zr-media-section" data-testid="video-section">
      <div className="zr-section__inner">

        {/* En-tête */}
        <div className="zr-section__header zr-section__header--light">
          <span className="zr-section__tag zr-section__tag--gold">{t.section_tag}</span>
          <h2 className="zr-section__title zr-section__title--light">{t.title}</h2>
          <p className="zr-section__subtitle zr-section__subtitle--light">{t.subtitle}</p>
        </div>

        {/* Bloc principal 2 colonnes */}
        <div className="zr-media-grid">

          {/* Colonne gauche — vidéo + légendes */}
          <div className="zr-media-left">

            {/* Thumbnail vidéo */}
            <div className="zr-media-thumb" data-testid="video-preview">
              <img
                src="/images/image9.jpeg"
                alt="Déclarations pour la Vie — Vidéo"
                className="zr-media-thumb__img"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              {/* Overlay titre livre */}
              <div className="zr-media-thumb__book-label">
                <span className="zr-media-thumb__book-title">DÉCLARATIONS POUR LA VIE</span>
              </div>
              {/* Bouton play */}
              <a
                href={FACEBOOK_VIDEO}
                target="_blank"
                rel="noopener noreferrer"
                className="zr-media-thumb__play"
                data-testid="video-play-btn"
                aria-label="Voir la vidéo sur Facebook"
              >
                <div className="zr-media-thumb__play-ring">
                  <Play size={28} fill="currentColor" />
                </div>
                <span className="zr-media-thumb__play-label">
                  {lang === "fr" ? "Visionner" : "Watch"}
                </span>
              </a>
            </div>

            {/* Légendes action */}
            <div className="zr-media-captions">
              {/* Témoignage */}
              <div className="zr-media-caption">
                <div className="zr-media-caption__icon zr-media-caption__icon--gold">
                  <MessageCircle size={16} />
                </div>
                <div className="zr-media-caption__body">
                  <span className="zr-media-caption__label">{t.testimony_label}</span>
                  <p className="zr-media-caption__text">{t.testimony_text}</p>
                </div>
              </div>

              {/* Suivi commande */}
              <div className="zr-media-caption">
                <div className="zr-media-caption__icon zr-media-caption__icon--red">
                  <Package size={16} />
                </div>
                <div className="zr-media-caption__body">
                  <span className="zr-media-caption__label">{t.tracking_label}</span>
                  <p className="zr-media-caption__text">{t.tracking_text}</p>
                  <a
                    href={trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zr-media-caption__link"
                  >
                    {t.tracking_link} →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite — description + CTA */}
          <div className="zr-media-right">
            <div className="zr-media-brand">ZOE &amp; REHOBOTH</div>
            <div className="zr-media-brand-sub">ÉDITIONS</div>

            <p className="zr-media-desc">{t.description}</p>

            {/* Bouton Facebook principal */}
            <a
              href={FACEBOOK_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="zr-media-fb-btn"
              data-testid="fb-page-btn"
            >
              {/* Icône Facebook SVG */}
              <svg className="zr-media-fb-btn__icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>{t.fb_cta}</span>
            </a>

            {/* Indicateur social */}
            <div className="zr-media-social-proof">
              <Users size={14} />
              <span>{t.fb_members}</span>
            </div>

            {/* Séparateur */}
            <div className="zr-media-divider" />

            {/* Citation */}
            <blockquote className="zr-media-quote">
              {lang === "fr"
                ? "« Que vos paroles soient toujours accompagnées de grâce… »"
                : "« Let your speech always be gracious… »"}
              <cite>— Col 4:6</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
