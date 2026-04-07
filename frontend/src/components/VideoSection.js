import React, { useContext } from "react";
import { LanguageContext } from "../App";
import { translations } from "../translations";
import { FACEBOOK_VIDEO, FACEBOOK_PAGE } from "../data/books";
import { Play, ExternalLink } from "lucide-react";

export default function VideoSection() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].video;

  return (
    <section className="zr-section zr-section--dark" data-testid="video-section">
      <div className="zr-section__inner">
        <div className="zr-section__header zr-section__header--light">
          <span className="zr-section__tag zr-section__tag--gold">{t.section_tag}</span>
          <h2 className="zr-section__title zr-section__title--light">{t.title}</h2>
          <p className="zr-section__subtitle zr-section__subtitle--light">{t.subtitle}</p>
        </div>

        <div className="zr-video-block">
          {/* Video preview */}
          <div className="zr-video-preview" data-testid="video-preview">
            <img
              src="/images/image9.jpeg"
              alt="Video preview"
              className="zr-video-preview__img"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="zr-video-preview__overlay">
              <a
                href={FACEBOOK_VIDEO}
                target="_blank"
                rel="noopener noreferrer"
                className="zr-video-preview__play"
                data-testid="video-play-btn"
                aria-label="Voir la vidéo sur Facebook"
              >
                <Play size={32} fill="currentColor" />
              </a>
            </div>
          </div>

          {/* Text content */}
          <div className="zr-video-content">
            <div className="zr-video-content__logo">ZOE &amp; REHOBOTH</div>
            <p className="zr-video-content__desc">{t.description}</p>
            <div className="zr-video-content__actions">
              <a
                href={FACEBOOK_VIDEO}
                target="_blank"
                rel="noopener noreferrer"
                className="zr-btn zr-btn--gold"
                data-testid="watch-fb-btn"
              >
                <Play size={16} />
                {t.watch_btn}
              </a>
              <a
                href={FACEBOOK_PAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="zr-btn zr-btn--outline-gold"
                data-testid="fb-page-btn"
              >
                <ExternalLink size={16} />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
