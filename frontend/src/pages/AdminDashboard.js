import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, getAuthHeader } from "../context/AuthContext";
import axios from "axios";
import {
  LogOut, Plus, Pencil, Trash2, Check, X, Star,
  MessageSquare, Calendar, ChevronDown, ChevronUp, Save
} from "lucide-react";

const API = process.env.REACT_APP_BACKEND_URL;

const BOOK_OPTIONS = [
  "Protocoles des Palais pour Percées Professionnelles",
  "Paroles de Percées pour Destinées Glorieuses (Version Enfant — Tome 1)",
  "Déclarations pour la Vie (Volume 1)",
  "Soyons Édifiés (30 Prières Quotidiennes)",
  "La Mission d'Ambassadeur",
];

// ─── Star Rating ──────────────────────────────────────────
function StarRating({ value = 5, onChange }) {
  return (
    <div className="zr-star-row">
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s}
          type="button"
          onClick={() => onChange && onChange(s)}
          className={`zr-star-btn ${s <= value ? "zr-star-btn--active" : ""}`}
        >
          <Star size={16} fill={s <= value ? "#D4AF37" : "none"} />
        </button>
      ))}
    </div>
  );
}

// ─── Testimonial Form ─────────────────────────────────────
function TestimonialForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || { name: "", location: "", book: BOOK_OPTIONS[0], text: "", stars: 5, approved: true });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="zr-admin-form-card">
      <div className="zr-admin-form__row">
        <div className="zr-admin-form__field">
          <label className="zr-admin-form__label">Nom</label>
          <input className="zr-admin-form__input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Marie-Claire K." />
        </div>
        <div className="zr-admin-form__field">
          <label className="zr-admin-form__label">Ville / Pays</label>
          <input className="zr-admin-form__input" value={form.location} onChange={e => set("location", e.target.value)} placeholder="Abidjan, CI" />
        </div>
      </div>
      <div className="zr-admin-form__field">
        <label className="zr-admin-form__label">Livre concerné</label>
        <select className="zr-admin-form__input" value={form.book} onChange={e => set("book", e.target.value)}>
          {BOOK_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div className="zr-admin-form__field">
        <label className="zr-admin-form__label">Témoignage</label>
        <textarea className="zr-admin-form__input zr-admin-form__textarea" value={form.text} onChange={e => set("text", e.target.value)} placeholder="Témoignage du lecteur..." rows={4} />
      </div>
      <div className="zr-admin-form__row">
        <div className="zr-admin-form__field">
          <label className="zr-admin-form__label">Note</label>
          <StarRating value={form.stars} onChange={v => set("stars", v)} />
        </div>
        <div className="zr-admin-form__field">
          <label className="zr-admin-form__label">Statut</label>
          <label className="zr-admin-toggle">
            <input type="checkbox" checked={form.approved} onChange={e => set("approved", e.target.checked)} />
            <span className="zr-admin-toggle__label">{form.approved ? "Publié" : "Masqué"}</span>
          </label>
        </div>
      </div>
      <div className="zr-admin-form__actions">
        <button className="zr-btn zr-btn--primary zr-btn--sm" onClick={() => onSave(form)}>
          <Save size={14} /> Enregistrer
        </button>
        <button className="zr-btn zr-btn--secondary zr-btn--sm" onClick={onCancel}>
          <X size={14} /> Annuler
        </button>
      </div>
    </div>
  );
}

// ─── Event Form ───────────────────────────────────────────
function EventForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || {
    date_fr: "", date_en: "", title_fr: "", title_en: "",
    location: "", description_fr: "", description_en: "",
    author: "Lewis Ekra", upcoming: true
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="zr-admin-form-card">
      <div className="zr-admin-form__row">
        <div className="zr-admin-form__field">
          <label className="zr-admin-form__label">Date (FR)</label>
          <input className="zr-admin-form__input" value={form.date_fr} onChange={e => set("date_fr", e.target.value)} placeholder="15 Avr 2025" />
        </div>
        <div className="zr-admin-form__field">
          <label className="zr-admin-form__label">Date (EN)</label>
          <input className="zr-admin-form__input" value={form.date_en} onChange={e => set("date_en", e.target.value)} placeholder="Apr 15, 2025" />
        </div>
      </div>
      <div className="zr-admin-form__row">
        <div className="zr-admin-form__field">
          <label className="zr-admin-form__label">Titre (FR)</label>
          <input className="zr-admin-form__input" value={form.title_fr} onChange={e => set("title_fr", e.target.value)} placeholder="Séance de Dédicaces" />
        </div>
        <div className="zr-admin-form__field">
          <label className="zr-admin-form__label">Titre (EN)</label>
          <input className="zr-admin-form__input" value={form.title_en} onChange={e => set("title_en", e.target.value)} placeholder="Book Signing Session" />
        </div>
      </div>
      <div className="zr-admin-form__field">
        <label className="zr-admin-form__label">Lieu</label>
        <input className="zr-admin-form__input" value={form.location} onChange={e => set("location", e.target.value)} placeholder="Day Labs, Cocody, Abidjan" />
      </div>
      <div className="zr-admin-form__field">
        <label className="zr-admin-form__label">Description (FR)</label>
        <textarea className="zr-admin-form__input zr-admin-form__textarea" value={form.description_fr} onChange={e => set("description_fr", e.target.value)} rows={2} />
      </div>
      <div className="zr-admin-form__field">
        <label className="zr-admin-form__label">Description (EN)</label>
        <textarea className="zr-admin-form__input zr-admin-form__textarea" value={form.description_en} onChange={e => set("description_en", e.target.value)} rows={2} />
      </div>
      <div className="zr-admin-form__row">
        <div className="zr-admin-form__field">
          <label className="zr-admin-form__label">Auteur</label>
          <select className="zr-admin-form__input" value={form.author} onChange={e => set("author", e.target.value)}>
            <option>Lewis Ekra</option>
            <option>Vogel Deza</option>
            <option>Lewis Ekra &amp; Vogel Deza</option>
          </select>
        </div>
        <div className="zr-admin-form__field">
          <label className="zr-admin-form__label">Statut</label>
          <label className="zr-admin-toggle">
            <input type="checkbox" checked={form.upcoming} onChange={e => set("upcoming", e.target.checked)} />
            <span className="zr-admin-toggle__label">{form.upcoming ? "À venir" : "Passé"}</span>
          </label>
        </div>
      </div>
      <div className="zr-admin-form__actions">
        <button className="zr-btn zr-btn--primary zr-btn--sm" onClick={() => onSave(form)}>
          <Save size={14} /> Enregistrer
        </button>
        <button className="zr-btn zr-btn--secondary zr-btn--sm" onClick={onCancel}>
          <X size={14} /> Annuler
        </button>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────
export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("testimonials");
  const [testimonials, setTestimonials] = useState([]);
  const [events, setEvents] = useState([]);
  const [showTestiForm, setShowTestiForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingTesti, setEditingTesti] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [msg, setMsg] = useState("");

  const headers = getAuthHeader();

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  const loadTestimonials = useCallback(async () => {
    const r = await axios.get(`${API}/api/admin/testimonials`, { headers });
    setTestimonials(r.data);
  }, []);

  const loadEvents = useCallback(async () => {
    const r = await axios.get(`${API}/api/admin/events`, { headers });
    setEvents(r.data);
  }, []);

  useEffect(() => { loadTestimonials(); loadEvents(); }, [loadTestimonials, loadEvents]);

  const handleLogout = () => { logout(); navigate("/admin"); };

  // Testimonials CRUD
  const saveTesti = async (form) => {
    if (editingTesti) {
      await axios.put(`${API}/api/admin/testimonials/${editingTesti.id}`, form, { headers });
      flash("Témoignage mis à jour ✓");
      setEditingTesti(null);
    } else {
      await axios.post(`${API}/api/admin/testimonials`, form, { headers });
      flash("Témoignage ajouté ✓");
      setShowTestiForm(false);
    }
    loadTestimonials();
  };

  const deleteTesti = async (id) => {
    if (!window.confirm("Supprimer ce témoignage ?")) return;
    await axios.delete(`${API}/api/admin/testimonials/${id}`, { headers });
    flash("Supprimé ✓");
    loadTestimonials();
  };

  const toggleApproved = async (t) => {
    await axios.put(`${API}/api/admin/testimonials/${t.id}`, { approved: !t.approved }, { headers });
    loadTestimonials();
  };

  // Events CRUD
  const saveEvent = async (form) => {
    if (editingEvent) {
      await axios.put(`${API}/api/admin/events/${editingEvent.id}`, form, { headers });
      flash("Événement mis à jour ✓");
      setEditingEvent(null);
    } else {
      await axios.post(`${API}/api/admin/events`, form, { headers });
      flash("Événement ajouté ✓");
      setShowEventForm(false);
    }
    loadEvents();
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Supprimer cet événement ?")) return;
    await axios.delete(`${API}/api/admin/events/${id}`, { headers });
    flash("Supprimé ✓");
    loadEvents();
  };

  return (
    <div className="zr-admin-page" data-testid="admin-dashboard">
      {/* Top bar */}
      <header className="zr-admin-topbar">
        <div className="zr-admin-topbar__brand">
          <img src="/images/logo.jpg" alt="ZOE & REHOBOTH" className="zr-admin-topbar__logo" />
          <div>
            <span className="zr-admin-topbar__title">ZOE &amp; REHOBOTH</span>
            <span className="zr-admin-topbar__sub">Panel Administrateur</span>
          </div>
        </div>
        <div className="zr-admin-topbar__right">
          <span className="zr-admin-topbar__user">{admin?.email}</span>
          <a href="/" target="_blank" className="zr-btn zr-btn--secondary zr-btn--sm">Voir le site</a>
          <button className="zr-btn zr-btn--sm" onClick={handleLogout} style={{ border: "1px solid #ccc", color: "#666" }}>
            <LogOut size={14} /> Déconnexion
          </button>
        </div>
      </header>

      {/* Flash message */}
      {msg && <div className="zr-admin-flash" data-testid="admin-flash">{msg}</div>}

      <div className="zr-admin-body">
        {/* Sidebar */}
        <aside className="zr-admin-sidebar">
          <button
            className={`zr-admin-sidebar__item ${activeTab === "testimonials" ? "zr-admin-sidebar__item--active" : ""}`}
            onClick={() => setActiveTab("testimonials")}
            data-testid="tab-testimonials"
          >
            <MessageSquare size={18} />
            <span>Témoignages</span>
            <span className="zr-admin-sidebar__count">{testimonials.length}</span>
          </button>
          <button
            className={`zr-admin-sidebar__item ${activeTab === "events" ? "zr-admin-sidebar__item--active" : ""}`}
            onClick={() => setActiveTab("events")}
            data-testid="tab-events"
          >
            <Calendar size={18} />
            <span>Agenda</span>
            <span className="zr-admin-sidebar__count">{events.length}</span>
          </button>
        </aside>

        {/* Content */}
        <main className="zr-admin-content">

          {/* Testimonials Tab */}
          {activeTab === "testimonials" && (
            <div data-testid="testimonials-tab">
              <div className="zr-admin-content__header">
                <h2 className="zr-admin-content__title">
                  <MessageSquare size={20} /> Témoignages Lecteurs
                </h2>
                <button
                  className="zr-btn zr-btn--primary zr-btn--sm"
                  onClick={() => { setShowTestiForm(true); setEditingTesti(null); }}
                  data-testid="add-testimonial-btn"
                >
                  <Plus size={14} /> Ajouter
                </button>
              </div>

              {(showTestiForm && !editingTesti) && (
                <TestimonialForm
                  onSave={saveTesti}
                  onCancel={() => setShowTestiForm(false)}
                />
              )}

              <div className="zr-admin-list">
                {testimonials.map(t => (
                  <div key={t.id} className={`zr-admin-list-item ${!t.approved ? "zr-admin-list-item--hidden" : ""}`} data-testid={`testimonial-item-${t.id}`}>
                    {editingTesti?.id === t.id ? (
                      <TestimonialForm
                        initial={t}
                        onSave={saveTesti}
                        onCancel={() => setEditingTesti(null)}
                      />
                    ) : (
                      <>
                        <div className="zr-admin-list-item__info">
                          <div className="zr-admin-list-item__name">
                            {t.name}
                            <span className="zr-admin-list-item__location">{t.location}</span>
                            {!t.approved && <span className="zr-admin-badge--hidden">Masqué</span>}
                          </div>
                          <div className="zr-admin-list-item__book">{t.book}</div>
                          <p className="zr-admin-list-item__text">{t.text}</p>
                          <div className="zr-star-row">
                            {[1,2,3,4,5].map(s => (
                              <Star key={s} size={13} fill={s <= t.stars ? "#D4AF37" : "none"} color={s <= t.stars ? "#D4AF37" : "#ccc"} />
                            ))}
                          </div>
                        </div>
                        <div className="zr-admin-list-item__actions">
                          <button className="zr-admin-icon-btn zr-admin-icon-btn--edit" onClick={() => setEditingTesti(t)} title="Modifier">
                            <Pencil size={15} />
                          </button>
                          <button
                            className={`zr-admin-icon-btn ${t.approved ? "zr-admin-icon-btn--hide" : "zr-admin-icon-btn--show"}`}
                            onClick={() => toggleApproved(t)}
                            title={t.approved ? "Masquer" : "Publier"}
                          >
                            {t.approved ? <EyeOff size={15} /> : <Check size={15} />}
                          </button>
                          <button className="zr-admin-icon-btn zr-admin-icon-btn--delete" onClick={() => deleteTesti(t.id)} title="Supprimer">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div data-testid="events-tab">
              <div className="zr-admin-content__header">
                <h2 className="zr-admin-content__title">
                  <Calendar size={20} /> Agenda &amp; Dédicaces
                </h2>
                <button
                  className="zr-btn zr-btn--primary zr-btn--sm"
                  onClick={() => { setShowEventForm(true); setEditingEvent(null); }}
                  data-testid="add-event-btn"
                >
                  <Plus size={14} /> Ajouter
                </button>
              </div>

              {(showEventForm && !editingEvent) && (
                <EventForm onSave={saveEvent} onCancel={() => setShowEventForm(false)} />
              )}

              <div className="zr-admin-list">
                {events.map(ev => (
                  <div key={ev.id} className="zr-admin-list-item" data-testid={`event-item-${ev.id}`}>
                    {editingEvent?.id === ev.id ? (
                      <EventForm initial={ev} onSave={saveEvent} onCancel={() => setEditingEvent(null)} />
                    ) : (
                      <>
                        <div className="zr-admin-list-item__info">
                          <div className="zr-admin-list-item__name">
                            {ev.title_fr}
                            <span className="zr-admin-list-item__location">{ev.date_fr}</span>
                            {ev.upcoming && <span className="zr-admin-badge--upcoming">À venir</span>}
                          </div>
                          <div className="zr-admin-list-item__book">{ev.location}</div>
                          <p className="zr-admin-list-item__text">{ev.description_fr}</p>
                        </div>
                        <div className="zr-admin-list-item__actions">
                          <button className="zr-admin-icon-btn zr-admin-icon-btn--edit" onClick={() => setEditingEvent(ev)}>
                            <Pencil size={15} />
                          </button>
                          <button className="zr-admin-icon-btn zr-admin-icon-btn--delete" onClick={() => deleteEvent(ev.id)}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {events.length === 0 && (
                  <div className="zr-admin-empty">Aucun événement. Cliquez sur "+ Ajouter" pour créer le premier.</div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// EyeOff import missing — add it
function EyeOff({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}
