# ZOE & REHOBOTH — PRD (Product Requirements Document)

## Project Overview
Landing page e-commerce multilingue (FR/EN) pour la maison d'édition chrétienne ZOE & REHOBOTH.

**URL Preview:** https://grace-editions-shop.preview.emergentagent.com

---

## Architecture
- **Frontend:** React (Create React App + Craco + Tailwind CSS)
- **Backend:** FastAPI (Python) — minimal, sert principalement les données statiques
- **Base de données:** MongoDB (minimal pour l'instant)
- **Images:** Extraites du fichier Word fourni par le client (11 images dans /public/images/)

---

## Identité Visuelle
- **Couleurs:** Sardonyx #8B1A00 | Or #D4AF37 | Blanc Cassé #FAF8F0
- **Typographie:** Cormorant Garamond (titres) + Outfit (corps)
- **Style:** Élégant, chrétien, warm, luxury

---

## Catalogue de Livres (5 ouvrages)

| # | Titre | Auteur | Prix | Promo |
|---|-------|--------|------|-------|
| 1 | Protocoles des Palais pour Percées Professionnelles | Lewis Ekra | 10,000 FCFA | 8,000 FCFA |
| 2 | Paroles de Percées pour Destinées Glorieuses (Enfant T1) | Lewis Ekra | 10,000 FCFA | — |
| 3 | Déclarations pour la Vie (Volume 1) | Lewis Ekra | 12,000 FCFA | — |
| 4 | Soyons Édifiés (30 Prières Quotidiennes) | Vogel Deza | 3,500 FCFA | — |
| 5 | La Mission d'Ambassadeur | Vogel Deza | 7,000 FCFA | — |

**Lien commande Livre 3:** https://declarationspourlavie.chenoustudio.com/

---

## Contacts & Liens
- **WhatsApp CI:** +225 07 59 49 31 18 → https://wa.me/2250759493118
- **Facebook:** https://www.facebook.com/ZoeAndRehobothEditions
- **Vidéo Facebook:** https://www.facebook.com/share/r/18KBRRPDzS/

---

## Sections Implémentées ✅
1. **Header** — Logo ZOE & REHOBOTH + Badge "Sponsorisé par la Grâce" + Nav + Switch FR/EN
2. **Hero** — Image de fond des auteurs + titre + CTA (scroll vers catalogue et distribution)
3. **Catalogue** — 5 livres en grille, prix, badge promo, bouton WhatsApp, modal Extrait Gratuit
4. **Auteurs** — Lewis Ekra & Vogel Deza (photos + bios + livres associés)
5. **Agenda** — 3 événements à venir (Cocody, Hebron, Salon du Livre)
6. **Vidéo** — Thumbnail cliquable → ouvre la vidéo Facebook (section sombre)
7. **Distribution** — Côte d'Ivoire (Hebron + Ma Librairie) + Togo + France + Banner WhatsApp
8. **Footer** — Logo + liens rapides + contacts + réseaux sociaux + copyright

---

## Fonctionnalités Clés
- ✅ Bilingue FR/EN (switch dans le header)
- ✅ Verset biblique aléatoire (52 versets, nouveau à chaque visite + bouton refresh)
- ✅ Boutons "Commander via WhatsApp" (pre-remplis avec titre du livre)
- ✅ Modal "Extrait Gratuit" pour chaque livre
- ✅ Lien site dédié pour livre 3
- ✅ Section Témoignages Lecteurs (6 témoignages depuis MongoDB)
- ✅ Panel Admin (/admin) avec JWT auth (gérer témoignages + agenda)
- ✅ Scroll doux entre sections
- ✅ Design responsive (mobile-first)
- ✅ Images réelles des couvertures des livres

---

## Backlog Priorisé

### P0 (Critique — Implémenté)
- [x] Catalogue complet avec images des livres
- [x] Commande via WhatsApp
- [x] Section auteurs
- [x] Switch de langue FR/EN
- [x] Footer avec tous les contacts

### P1 (Important — À venir)
- [ ] Intégration paiement mobile money (CinetPay ou FedaPay) quand clés disponibles
- [ ] Téléchargement PDF après paiement + watermarking
- [ ] Formulaire de contact / newsletter

### P2 (Améliorations futures)
- [ ] Carte Google Maps pour les librairies
- [ ] Section témoignages / avis lecteurs
- [ ] Blog/Articles chrétiens
- [ ] Compte client pour historique commandes
- [ ] Carte bancaire internationale (Stripe)

---

## Fichiers Clés
- `/app/frontend/src/App.js` — App principale + LanguageContext
- `/app/frontend/src/translations.js` — Toutes les traductions FR/EN
- `/app/frontend/src/data/books.js` — Données livres, auteurs, événements
- `/app/frontend/src/components/` — Header, Hero, Catalogue, Auteurs, Agenda, VideoSection, Distribution, Footer
- `/app/frontend/src/App.css` — Styles complets (classes préfixées zr-)
- `/app/frontend/public/images/logo.jpg` — Logo officiel (colombe + Zoe & Rehoboth Editions)

---

## Notes de Déploiement
- Pas d'intégration de paiement pour l'instant (décision client)
- Commandes via WhatsApp uniquement
- Images servies depuis /public/images/ (11 fichiers JPEG)

*Créé le: 2026-04-07*
*Version: 1.0 MVP*
