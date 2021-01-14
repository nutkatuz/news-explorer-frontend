import React from 'react';
import { useLocation } from 'react-router-dom';
import NewsCard from '../NewsCard/NewsCard';
// import Preloader from '../Preloader/Preloader'; // '''''крутися и блочит всё ###
import noResultImage from '../../images/svg/no-result.svg';
import './NewsCardList.css';
// NewsCardList — компонент, который управляет отрисовкой карточек на страницу и их количеством;

function NewsCardList(props) {
  const {pathname} = useLocation();

  return (
    <div className='card-list'>
      {/* <Preloader /> */}
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

      {pathname === '/' && (
        <h2 className='card-list__header'>Результаты поиска</h2>
      )}
      <div className='card-list__container'>
        <NewsCard />
      </div>
      {pathname === '/' && (
        <button className='card-list__show-button'>Показать еще</button>
      )}
    </div>
  );
}

export default NewsCardList;
