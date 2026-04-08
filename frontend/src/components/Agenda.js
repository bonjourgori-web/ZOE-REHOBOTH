import React, { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../App";
import { translations } from "../translations";
import { events as staticEvents } from "../data/books";
import { MapPin, Calendar, User } from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

export default function Agenda() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].agenda;
  const [events, setEvents] = useState(staticEvents);

  useEffect(() => {
    axios.get(`${API}/api/events`)
      .then(r => { if (r.data.length > 0) setEvents(r.data); })
      .catch(() => {});
  }, []);

  return (
    <section id="agenda" className="zr-section" data-testid="agenda-section">
      <div className="zr-section__inner">
        <div className="zr-section__header">
          <span className="zr-section__tag">{t.section_tag}</span>
          <h2 className="zr-section__title">{t.title}</h2>
          <p className="zr-section__subtitle">{t.subtitle}</p>
        </div>

        <div className="zr-events-list" data-testid="events-list">
          {events.map((event, i) => {
            const date = lang === "fr" ? event.date_fr : event.date_en;
            const title = lang === "fr" ? event.title_fr : event.title_en;
            const description = lang === "fr" ? event.description_fr : event.description_en;
            return (
              <div key={event.id || i} className="zr-event-card" data-testid={`event-card-${i}`}>
                <div className="zr-event-card__date-col">
                  <div className="zr-event-date">
                    <Calendar size={14} />
                    <span>{date}</span>
                  </div>
                  {event.upcoming && (
                    <span className="zr-event-badge">{t.upcoming_badge}</span>
                  )}
                </div>
                <div className="zr-event-card__content">
                  <h3 className="zr-event-card__title">{title}</h3>
                  <div className="zr-event-card__meta">
                    <span className="zr-event-card__location"><MapPin size={13} />{event.location}</span>
                    <span className="zr-event-card__author"><User size={13} />{event.author}</span>
                  </div>
                  <p className="zr-event-card__desc">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
