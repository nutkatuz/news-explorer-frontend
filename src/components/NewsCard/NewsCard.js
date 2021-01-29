import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NewsCard.css';

function NewsCard(props) {
  const { pathname } = useLocation();
  const infoText = `${
    pathname === '/'
      ? `Войдите, чтобы сохранять статьи`
      : `Убрать из сохранённых`
  }`;

  let date = new Date(props.publishedAt); 
  date = date.toLocaleString("ru", {
    month: 'long',
    day: 'numeric'
  }) + ', ' + date.toLocaleString("ru", {year: 'numeric'}) ;
  
  return (
      <li className='card__container'>
    <a className='сard' to={props.url}>
        <img className='card__image' 
        alt={props.title} 
        src={props.urlToImage} />
        {pathname === '/saved-news' && (
          <div className='card__keyword-container'>
            <p className='card__keyword'>{props.keyWord}</p>
          </div>
        )}
        <div
          className={
            pathname === '/'
              ? `card__button-container card__button-container_main`
              : `card__button-container card__button-container_saved-news`
          }
        >
          <div className='card__button-info-container'>
            <p className='card__button-info'>{infoText}</p>
          </div>
          <button
            className={
              pathname === '/'
                ? `card__button card__button_add`
                : `card__button card__button_delete`
            }
          ></button>
        </div>
        <div className='card__text'>
          <p className='card__date'>{date}</p>
          <p className='card__title'>
          {props.title} 
          </p>
          <p className='card__description'>
          {props.description}
          </p>
        </div>
        <p className='card__sourse'>{props.source}</p>
    </a>
      </li>
  );
}

export default NewsCard;
