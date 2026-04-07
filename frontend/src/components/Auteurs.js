import React, { useState, useContext } from "react";
import { LanguageContext } from "../App";
import { translations } from "../translations";
import { authors, books } from "../data/books";
import { BookOpen } from "lucide-react";

export default function Auteurs() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].authors;

  return (
    <section id="auteurs" className="zr-section zr-section--warm" data-testid="authors-section">
      <div className="zr-section__inner">
        <div className="zr-section__header">
          <span className="zr-section__tag">{t.section_tag}</span>
          <h2 className="zr-section__title">{t.title}</h2>
          <p className="zr-section__subtitle">{t.subtitle}</p>
        </div>

        <div className="zr-authors-grid">
          {authors.map((author, index) => {
            const bio = lang === "fr" ? author.bio_fr : author.bio_en;
            const authorBooks = books.filter((b) => author.books.includes(b.id));
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={author.id}
                className={`zr-author-card ${isReversed ? "zr-author-card--reversed" : ""}`}
                data-testid={`author-card-${author.id}`}
              >
                {/* Photo */}
                <div className="zr-author-card__photo-wrap">
                  <AuthorPhoto author={author} />
                </div>

                {/* Bio */}
                <div className="zr-author-card__content">
                  <h3 className="zr-author-card__name">{author.name}</h3>
                  <p className="zr-author-card__bio">{bio}</p>

                  {/* Books by author */}
                  <div className="zr-author-card__books">
                    <p className="zr-author-card__books-label">
                      <BookOpen size={15} />
                      {t.books_by} {author.name.split(" ")[0]} :
                    </p>
                    <ul className="zr-author-card__books-list">
                      {authorBooks.map((b) => (
                        <li key={b.id} className="zr-author-card__book-item">
                          <span className="zr-author-card__book-dot" />
                          {lang === "fr" ? b.title_fr : b.title_en}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AuthorPhoto({ author }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="zr-author-photo">
      {!imgError ? (
        <img
          src={author.image}
          alt={author.name}
          className="zr-author-photo__img"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="zr-author-photo__fallback">
          <span>{author.name.charAt(0)}</span>
        </div>
      )}
      <div className="zr-author-photo__name-tag">{author.name}</div>
    </div>
  );
}
