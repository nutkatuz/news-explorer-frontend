import { React, useContext } from "react";
import { useLocation } from "react-router-dom";
import { NewsContext } from "../../contexts/NewsContext";
import "./NewsCard.css";

function NewsCard({loggedIn, onBtnClick, article}) {
  const { pathname } = useLocation();
  const { savedNews } = useContext(NewsContext);

  const {
    keyword,
    title,
    description,
    publishedAt,
    url,
    urlToImage,
    source,
  } = article;

  // дата
  let date = new Date(publishedAt);
  date =
    date.toLocaleString("ru", {
      month: "long",
      day: "numeric",
    }) +
    ", " +
    date.toLocaleString("ru", { year: "numeric" });

  //синяя закладка
  const isSaved = savedNews.some(
      i => i.title === article.title && i.description === article.description
  );

  function handleCardButtonClick() {
    onBtnClick(article);
  }

  // всплывающая подсказка
  const infoText = `${
    pathname === "/"
      ? "Войдите, чтобы сохранять статьи"
      // : isSaved && "Убрать из сохранённых"
      : "Убрать из сохранённых"
  }`;

  return (
    <li className="card">
      {pathname === "/saved-news" && (
        <div className="card__keyword-container">
          <p className="card__keyword">{keyword}</p>
        </div>
      )}

      <div
        className={
          pathname === "/"
            ? `card__button-container card__button-container_main`
            : `card__button-container card__button-container_saved-news`
        }
      >
        {loggedIn && <div className="card__button-info-container">
          <p className="card__button-info">{infoText}</p>
        </div>}

        {pathname === "/" && !isSaved && (
          <div
            className="card__button card__button_add"
            onClick={handleCardButtonClick}
          ></div>
        )}

        {pathname === "/" && isSaved && (
          <div
            className="card__button card__button_added"
            onClick={handleCardButtonClick}
          ></div>
        )}

        {pathname !== "/" && (
          <div
            className="card__button card__button_delete"
            onClick={handleCardButtonClick}
          ></div>
        )}
      </div>

      <a
        className="card__container"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <img className="card__image" alt={source} src={urlToImage} />
        <div className="card__text">
          <p className="card__date">{date}</p>
          <h2 className="card__title">{title}</h2>
          <p className="card__description">{description}</p>
          <p className="card__sourse">{source}</p>
        </div>
      </a>
    </li>
  );
}

export default NewsCard;
