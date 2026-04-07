import React, { useState, useContext } from "react";
import { LanguageContext } from "../App";
import { translations } from "../translations";
import { books, getWhatsappUrl } from "../data/books";
import { MessageCircle, BookOpen, X, ExternalLink, Tag } from "lucide-react";

function ExcerptModal({ book, lang, onClose }) {
  const t = translations[lang].catalogue.modal;
  const title = lang === "fr" ? book.title_fr : book.title_en;
  const excerpt = lang === "fr" ? book.excerpt_fr : book.excerpt_en;

  return (
    <div
      className="zr-modal-overlay"
      onClick={onClose}
      data-testid="excerpt-modal-overlay"
    >
      <div
        className="zr-modal"
        onClick={(e) => e.stopPropagation()}
        data-testid="excerpt-modal"
      >
        <button
          className="zr-modal__close"
          onClick={onClose}
          data-testid="modal-close-btn"
        >
          <X size={20} />
        </button>
        <div className="zr-modal__header">
          <BookOpen size={20} className="zr-modal__icon" />
          <span>{t.title}</span>
        </div>
        <h3 className="zr-modal__book-title">{title}</h3>
        <p className="zr-modal__author">— {book.author}</p>
        <p className="zr-modal__intro">{t.intro}</p>
        <div className="zr-modal__excerpt">
          {excerpt.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <div className="zr-modal__footer">
          <p className="zr-modal__prompt">{t.order_prompt}</p>
          <div className="zr-modal__actions">
            <a
              href={getWhatsappUrl(title, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="zr-btn zr-btn--primary"
              data-testid="modal-order-whatsapp-btn"
            >
              <MessageCircle size={16} />
              {t.order_btn}
            </a>
            {book.order_link && (
              <a
                href={book.order_link}
                target="_blank"
                rel="noopener noreferrer"
                className="zr-btn zr-btn--secondary"
                data-testid="modal-order-site-btn"
              >
                <ExternalLink size={16} />
                Site dédié
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BookCard({ book, lang, onExcerpt }) {
  const t = translations[lang].catalogue;
  const title = lang === "fr" ? book.title_fr : book.title_en;
  const description = lang === "fr" ? book.description_fr : book.description_en;
  const whatsappUrl = getWhatsappUrl(title, lang);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="zr-book-card" data-testid={`book-card-${book.id}`}>
      {/* Cover image */}
      <div className="zr-book-card__cover">
        {!imgError ? (
          <img
            src={book.image}
            alt={title}
            className="zr-book-card__img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="zr-book-card__img-fallback">
            <BookOpen size={48} />
            <span>{book.author[0]}</span>
          </div>
        )}
        {book.has_promo && (
          <div className="zr-book-card__promo-badge" data-testid={`promo-badge-${book.id}`}>
            <Tag size={12} />
            {t.promo_label}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="zr-book-card__body">
        <p className="zr-book-card__author">{book.author}</p>
        <h3 className="zr-book-card__title">{title}</h3>
        <p className="zr-book-card__desc">{description}</p>

        {/* Price */}
        <div className="zr-book-card__price">
          {book.has_promo ? (
            <>
              <span className="zr-book-card__price--promo">
                {book.promo_price.toLocaleString()} {t.currency}
              </span>
              <span className="zr-book-card__price--old">
                {book.price.toLocaleString()} {t.currency}
              </span>
            </>
          ) : (
            <span className="zr-book-card__price--regular">
              {book.price.toLocaleString()} {t.currency}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="zr-book-card__actions">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="zr-btn zr-btn--primary zr-btn--sm"
            data-testid={`order-whatsapp-btn-${book.id}`}
          >
            <MessageCircle size={15} />
            {t.order_btn}
          </a>
          <button
            className="zr-btn zr-btn--secondary zr-btn--sm"
            onClick={() => onExcerpt(book)}
            data-testid={`excerpt-btn-${book.id}`}
          >
            <BookOpen size={15} />
            {t.excerpt_btn}
          </button>
        </div>

        {/* Dedicated order site */}
        {book.order_link && (
          <a
            href={book.order_link}
            target="_blank"
            rel="noopener noreferrer"
            className="zr-book-card__site-link"
            data-testid={`order-site-link-${book.id}`}
          >
            <ExternalLink size={13} />
            {t.also_available} — {t.dedicated_site}
          </a>
        )}
      </div>
    </div>
  );
}

export default function Catalogue() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].catalogue;
  const [excerptBook, setExcerptBook] = useState(null);

  return (
    <section id="catalogue" className="zr-section" data-testid="catalogue-section">
      <div className="zr-section__inner">
        <div className="zr-section__header">
          <span className="zr-section__tag">{t.section_tag}</span>
          <h2 className="zr-section__title">{t.title}</h2>
          <p className="zr-section__subtitle">{t.subtitle}</p>
        </div>

        <div className="zr-books-grid" data-testid="books-grid">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              lang={lang}
              onExcerpt={setExcerptBook}
            />
          ))}
        </div>
      </div>

      {excerptBook && (
        <ExcerptModal
          book={excerptBook}
          lang={lang}
          onClose={() => setExcerptBook(null)}
        />
      )}
    </section>
  );
}
