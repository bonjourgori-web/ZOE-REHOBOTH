import React, { useContext } from "react";
import { LanguageContext } from "../App";
import { translations } from "../translations";
import { distributionData, WHATSAPP_BASE, WHATSAPP_NUMBER } from "../data/books";
import { MapPin, MessageCircle, ShoppingBag } from "lucide-react";

export default function Distribution() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].distribution;
  const whatsappMsg =
    lang === "fr"
      ? "Bonjour, je souhaite commander un livre ZOE & REHOBOTH. Merci."
      : "Hello, I would like to order a ZOE & REHOBOTH book. Thank you.";
  const whatsappUrl = `${WHATSAPP_BASE}?text=${encodeURIComponent(whatsappMsg)}`;
  const formattedNumber = "+225 07 59 49 31 18";

  return (
    <section id="distribution" className="zr-section zr-section--warm" data-testid="distribution-section">
      <div className="zr-section__inner">
        <div className="zr-section__header">
          <span className="zr-section__tag">{t.section_tag}</span>
          <h2 className="zr-section__title">{t.title}</h2>
          <p className="zr-section__subtitle">{t.subtitle}</p>
        </div>

        {/* Countries grid */}
        <div className="zr-distribution-grid" data-testid="distribution-grid">
          {distributionData.map((loc) => {
            const country = lang === "fr" ? loc.country_fr : loc.country_en;
            return (
              <div
                key={loc.id}
                className="zr-distribution-card"
                data-testid={`distribution-card-${loc.id}`}
              >
                <div className="zr-distribution-card__flag">{loc.flag}</div>
                <h3 className="zr-distribution-card__country">{country}</h3>
                {loc.stores.length > 0 && (
                  <ul className="zr-distribution-card__stores">
                    {loc.stores.map((store) => (
                      <li key={store} className="zr-distribution-card__store">
                        <ShoppingBag size={13} />
                        {store}
                      </li>
                    ))}
                  </ul>
                )}
                {loc.whatsapp && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zr-btn zr-btn--primary zr-btn--sm zr-distribution-card__btn"
                    data-testid={`whatsapp-order-btn-${loc.id}`}
                  >
                    <MessageCircle size={14} />
                    {t.order_direct}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp info banner */}
        <div className="zr-whatsapp-banner" data-testid="whatsapp-banner">
          <MessageCircle size={28} className="zr-whatsapp-banner__icon" />
          <div className="zr-whatsapp-banner__text">
            <p className="zr-whatsapp-banner__info">{t.whatsapp_info}</p>
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="zr-whatsapp-banner__number"
              data-testid="whatsapp-number"
            >
              {formattedNumber}
            </a>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="zr-btn zr-btn--primary"
            data-testid="whatsapp-main-btn"
          >
            <MessageCircle size={16} />
            {t.whatsapp_btn}
          </a>
        </div>
      </div>
    </section>
  );
}
