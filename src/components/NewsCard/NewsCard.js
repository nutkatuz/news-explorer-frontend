import React from 'react';
import newsCardPhoto from '../../images/me2.jpg';
import { useLocation } from 'react-router-dom';

function NewsCard() {
  const { pathname } = useLocation();
  const infoText = `${
    pathname === '/'
      ? `Войдите, чтобы сохранять статьи`
      : `Убрать из сохранённых`
  }`;

  return (
    <section claccName='card section'>
      <div className='card__container'>
        <img className='card__image' alt='Фото статьи' src={newsCardPhoto} />
        {pathname !== '/' && (
          <div className='card__keyword-container'>
            <p className='card__keyword'>Природа</p>
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
                : `card__button card__button_trash`
            }
          ></button>
        </div>
        <div className='card__info'>
          <p className='card__date'>2 августа, 2019</p>
          <p className='card__heading'>Национальное достояние – парки</p>
          <p className='card__description'>
            В 2016 году Америка отмечала важный юбилей: сто лет назад здесь
            начала складываться система национальных парков – охраняемых
            территорий, где и сегодня каждый может приобщиться к природе.
          </p>
        </div>
        <p className='card__sourse'>Лента.ру</p>
      </div>

      <div className='card__container'>
        <img className='card__image' alt='Фото статьи' src={newsCardPhoto} />
        {pathname !== '/' && (
          <div className='card__keyword-container'>
            <p className='card__keyword'>Природа</p>
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
                : `card__button card__button_trash`
            }
          ></button>
        </div>
        <div className='card__info'>
          <p className='card__date'>2 августа, 2019</p>
          <p className='card__heading'>
            Лесные огоньки: история одной фотографии
          </p>
          <p className='card__description'>
            В 2016 году Америка отмечала важный юбилей: сто лет назад здесь
            начала складываться система национальных парков.
          </p>
        </div>
        <p className='card__sourse'>Лента.ру</p>
      </div>

      <div className='card__container'>
        <img className='card__image' alt='Фото статьи' src={newsCardPhoto} />
        {pathname !== '/' && (
          <div className='card__keyword-container'>
            <p className='card__keyword'>Природа</p>
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
                : `card__button card__button_trash`
            }
          ></button>
        </div>
        <div className='card__info'>
          <p className='card__date'>2 августа, 2019</p>
          <p className='card__heading'>
            «Первозданная тайга»: новый фотопроект Игоря Шпиленка
          </p>
          <p className='card__description'>
            В 2016 году Америка отмечала важный юбилей: сто лет назад здесь
            начала складываться система национальных парков – охраняемых
            территорий, где и сегодня каждый может приобщиться к природе.
          </p>
        </div>
        <p className='card__sourse'>Лента.ру</p>
      </div>
    </section>
  );
}

export default NewsCard;