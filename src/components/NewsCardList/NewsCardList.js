import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { NewsContext } from "../../contexts/NewsContext";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import noResultImage from "../../images/svg/no-result.svg";
import "./NewsCardList.css";

function NewsCardList(props) {
  const { pathname } = useLocation();

  //количество отрисованных карточек 3

  const [currentRow, setCurrentRow] = React.useState(0);
  const { cards } = useContext(NewsContext);

  const trinityCards = cards.slice(0, (currentRow + 1) * 3);
  function handleShowMore() {
    setCurrentRow(currentRow + 1);
  }

  React.useEffect(() => {
    // setCards({});
    setCurrentRow(0)
  }, [props.isSubmitted]) 

  return (
    <div className="card-list">
      {pathname === "/" && (
        <h2 className="card-list__header">Результаты поиска</h2>
      )}

      {props.isSubmitted && <Preloader />}

      {cards.length 
      ? (
        <>
          <ul className="card-list__container">
            {trinityCards.map((card, i) => (
              <NewsCard
                key={i}
                article={card}
                loggedIn={props.loggedIn}
                onCardClick={props.onCardClick}
              />
            ))}
          </ul>

          {pathname === "/" && (
            <button onClick={handleShowMore} className="card-list__button">
              Показать еще
            </button>
          )}
        </>
      ) 
      : (
        <>
          {pathname === "/" && (
            <section className="no-result">
              <img
                className="no-result__image"
                src={noResultImage}
                alt="Ничего не найдено"
              />
              <h3 className="no-result__heading">Ничего не найдено</h3>
              <p className="no-result__description">
                К сожалению, по вашему запросу ничего не найдено.
              </p>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default NewsCardList;
