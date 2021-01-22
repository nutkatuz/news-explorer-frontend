import React from 'react';
import { useLocation } from 'react-router-dom';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader'; 
import noResultImage from '../../images/svg/no-result.svg';
import './NewsCardList.css';

function NewsCardList(props) {
  const {isSubmitted, cards} = props;
  const {pathname} = useLocation();

  return (
    <div className='card-list'>
      {pathname === '/' && (
        <h2 className='card-list__header'>Результаты поиска</h2>
      )}
      <ul className='card-list__container'>
        {
        isSubmitted
        ? <Preloader />
        : cards.map((card, i) => <NewsCard 
        key={i}
        {...card} />)
        }
      </ul>
      {pathname === '/' && (
        <button className='card-list__button'>Показать еще</button>
      )}
    {pathname === '/' && (
      <section className='no-result'>
        <img
          className='no-result__image'
          src={noResultImage}
          alt='Ничего не найдено'
        />
        <h3 className='no-result__heading'>Ничего не найдено</h3>
        <p className='no-result__description'>
          К сожалению по вашему запросу ничего не найдено.
        </p>
      </section>
    )}
    </div>
  );
}

export default NewsCardList;

// NewsCardList — компонент, который управляет отрисовкой карточек на страницу и их количеством;