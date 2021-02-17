import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { NewsContext } from "../../contexts/NewsContext";
import "./Header.css";

function Header(props) {
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useLocation();
  const { savedNews } = React.useContext(NewsContext);

  function handleClick() {
    setIsActive(!isActive);
  }
  const active = `${isActive ? "active " : ""}`;

  // изменить окончание статей статьи статья
  function title(array) {
    if (array === 1) {
      return "сохраненная статья";
      // } else if (array === 0) {
      //     return 'сохраненных статей, ';
    } else if (array >= 5) {
      return "сохраненных статей";
    } else if (array > 1 && array < 5) {
      return "сохраненные статьи";
    }
  }

  // Природа, тайга и двум другим

  const keywords = savedNews.map((item) => item.keyword) || [];

  const count = (array) => {
    return ["му", "м", "и"][
      array.slice(3).length % 10 === 1 && array.slice(3).length % 100 !== 11
        ? 0
        : array.slice(3).length % 10 >= 2 &&
          array.slice(3).length % 10 <= 4 &&
          (array.slice(3).length % 100 < 10 ||
            array.slice(3).length % 100 >= 20)
        ? 1
        : 2
    ];
  };

  const adjectiveDeclination = (array) => {
    return ["другому", "другим"][
      array.slice(3).length % 10 === 1 && array.slice(3).length % 100 !== 11
        ? 0
        : 1
    ];
  };

  const words = [...new Set(keywords)]
    .map((value) => {
      const item = {};
      item.keyword = value;
      item.quantity = keywords.filter((str) => str === value).length;
      return item;
    })
    .sort((a, b) => b.quantity - a.quantity)
    .map((item) => item.keyword);

  const keywordsForJSX =
    words.length <= 3
      ? words.join(", ")
      : `${words.slice(0, 3).join(", ")} и ${words.slice(3).length}-${count(
          words
        )} ${adjectiveDeclination(words)}`;

  return (
    <>
      <div className={pathname === "/" ? "background" : ""}>
        <header
          className={
            pathname === "/"
              ? "section header"
              : `${isActive ? "section header" : "section header header_black"}`
          }
        >
          <p className="header__logo" >
            NewsExplorer
            <button
              aria-label="Мобильное меню"
              className={
                pathname === "/"
                  ? `${active + "header__burger"}`
                  : `${active + "header__burger header__burger_black"}`
              }
              onClick={handleClick}
            />
          </p>
          <nav className={active + " header__menu"}>
            <Link
              to={"/"}
              className={
                pathname === "/"
                  ? "navbar__link navbar__link_wunderlined"
                  : "navbar__link"
              }
            >
              Главная
            </Link>
            {props.loggedIn ? (
              <Link
                to={"/saved-news"}
                className={
                  pathname === "/saved-news"
                    ? "navbar__link navbar__link_bunderlined"
                    : "navbar__link"
                }
              >
                Сохранённые статьи
              </Link>
            ) : (
              ""
            )}
            {props.loggedIn ? (
              <button onClick={props.onSignOut} className="navbar__auth-btn">
                <p className="navbar__name">{props.name}</p>
                <div
                  className={
                    pathname === "/"
                      ? "navbar__logout-image"
                      : `${
                          active +
                          "navbar__logout-image navbar__logout-image_black"
                        }`
                  }
                />
              </button>
            ) : (
              <button onClick={props.onLogIn} className="navbar__auth-btn">
                <p className="navbar__auth-name">Авторизоваться</p>
              </button>
            )}
          </nav>
        </header>

        {pathname === "/" && (
          <SearchForm
            handleSubmit={props.handleSubmit}
            searchQuery={props.searchQuery}
            setSearchQuery={props.setSearchQuery}
            isSubmitted={props.isSubmitted}
          />
        )}
      </div>

      {pathname === "/saved-news" && (
        <section className="section saved-news">
          <p className="saved-news__subtitle">Сохранённые статьи</p>

          <h2 className="saved-news__title">
            {props.name}, у вас
            {savedNews.length
              ? ` ${savedNews.length} ${title(savedNews.length)} `
              : " нет сохраненных статей"}
          </h2>

          {savedNews.length > 0 && (
            <p className="saved-news__keywords">
              По ключевым словам:{" "}
              <span className="saved-news__span">{keywordsForJSX}</span>
            </p>
          )}
        </section>
      )}
    </>
  );
}

export default Header;
