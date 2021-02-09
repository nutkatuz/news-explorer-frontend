import React from "react";
import { useLocation } from "react-router-dom";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import noResultImage from "../../images/svg/no-result.svg";
import "./NewsCardList.css";
import { CARDSINROW } from "../../utils/constants";

function NewsCardList({isSubmitted, onBtnClick, loggedIn, cards }) {
  
  const { pathname } = useLocation();

  //количество отрисованных карточек

  const [currentRow, setCurrentRow] = React.useState(0);
  const trinityCards = cards.slice(0, (currentRow + 1) * CARDSINROW);
  
  function handleShowMore() {
    setCurrentRow(currentRow + 1);
  }

  React.useEffect(() => {
    setCurrentRow(0)
  }, [isSubmitted]) 

  return (
    <div className="card-list">
      {pathname === "/" && cards.length>0 && (
        <h2 className="card-list__header">Результаты поиска: {cards.length}</h2>
      )}

      {isSubmitted && <Preloader />}

      {cards.length 
      ? (
        <>
          <ul className="card-list__container">
            {trinityCards.map((card, i) => (
              <NewsCard
                key={i}
                article={card}
                loggedIn={loggedIn}
                onBtnClick={onBtnClick}
              />
            ))}
          </ul>

          {
          // pathname === "/" &&  -сохраненки показывать тоже с кнопкой
          cards.length !== trinityCards.length && (
            <button onClick={handleShowMore} className="card-list__button">
              Показать еще
            </button>
          )}
        </>
      ) 
      : (
        <>
          {!isSubmitted && pathname === "/" && (
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
