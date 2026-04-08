import React, { useContext } from "react";
import { LanguageContext } from "../App";
import { translations } from "../translations";
import {
  WHATSAPP_BASE,
  WHATSAPP_NUMBER,
  FACEBOOK_PAGE,
} from "../data/books";
import { MessageCircle, Facebook, Heart } from "lucide-react";

export default function Footer() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].footer;
  const tNav = translations[lang].nav;

  const whatsappMsg =
    lang === "fr"
      ? "Bonjour ZOE & REHOBOTH, je souhaite obtenir plus d'informations."
      : "Hello ZOE & REHOBOTH, I would like to get more information.";
  const whatsappUrl = `${WHATSAPP_BASE}?text=${encodeURIComponent(whatsappMsg)}`;
  const formattedNumber = "+225 07 59 49 31 18";

  const navLinks = [
    { label: tNav.catalogue, href: "#catalogue" },
    { label: tNav.authors, href: "#auteurs" },
    { label: tNav.agenda, href: "#agenda" },
    { label: tNav.distribution, href: "#distribution" },
  ];

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="zr-footer" data-testid="footer">
      <div className="zr-footer__inner">
        {/* Brand */}
        <div className="zr-footer__brand">
          <div className="zr-footer__logo">
            <img
              src="/images/logo.jpg"
              alt="Zoe & Rehoboth Editions"
              className="zr-footer__logo-img"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling && (e.target.nextSibling.style.display = "flex");
              }}
            />
            <div className="zr-footer__logo-fallback" style={{display:"none"}}>
              <span className="zr-logo__zoe">ZOE</span>
              <span className="zr-logo__amp"> &amp; </span>
              <span className="zr-logo__rehoboth">REHOBOTH</span>
            </div>
          </div>
          <p className="zr-footer__publisher">{t.publisher}</p>
          <p className="zr-footer__tagline">{t.tagline}</p>
          <p className="zr-footer__desc">{t.description}</p>
        </div>

        {/* Quick Links */}
        <div className="zr-footer__col">
          <h4 className="zr-footer__col-title">{t.quick_links}</h4>
          <ul className="zr-footer__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  className="zr-footer__link"
                  onClick={() => scrollTo(link.href)}
                  data-testid={`footer-nav-${link.href.replace("#", "")}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="zr-footer__col">
          <h4 className="zr-footer__col-title">{t.contact}</h4>
          <div className="zr-footer__contact">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="zr-footer__contact-item"
              data-testid="footer-whatsapp-link"
            >
              <MessageCircle size={16} />
              <div>
                <span className="zr-footer__contact-label">
                  WhatsApp — {t.whatsapp_ci}
                </span>
                <span className="zr-footer__contact-value">{formattedNumber}</span>
              </div>
            </a>
            <a
              href={FACEBOOK_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="zr-footer__contact-item"
              data-testid="footer-facebook-link"
            >
              <Facebook size={16} />
              <div>
                <span className="zr-footer__contact-label">
                  {t.facebook}
                </span>
                <span className="zr-footer__contact-value">
                  ZoeAndRehobothEditions
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Follow Us */}
        <div className="zr-footer__col">
          <h4 className="zr-footer__col-title">{t.follow_us}</h4>
          <div className="zr-footer__social">
            <a
              href={FACEBOOK_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="zr-footer__social-btn"
              aria-label="Facebook"
              data-testid="footer-social-facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="zr-footer__social-btn"
              aria-label="WhatsApp"
              data-testid="footer-social-whatsapp"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="zr-footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} ZOE &amp; REHOBOTH Éditions.{" "}
          {t.rights}.
        </p>
        <p className="zr-footer__made-with">
          Made with <Heart size={12} fill="currentColor" /> by Grace
        </p>
      </div>
    </footer>
  );
}
