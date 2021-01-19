import React from 'react';
import firstCardPhoto from '../../images/image_04.png';
import secondCardPhoto from '../../images/image_07.png';
import thirdCardPhoto from '../../images/image_08.png';
import fourthCardPhoto from '../../images/image_06.png';
import fifthCardPhoto from '../../images/image_05.png';
import sixthCardPhoto from '../../images/image_01.png';
import { useLocation } from 'react-router-dom';
import './NewsCard.css';

// NewsCard — компонент новостной карточки;
function NewsCard() {
  const { pathname } = useLocation();
  const infoText = `${
    pathname === '/'
      ? `Войдите, чтобы сохранять статьи`
      : `Убрать из сохранённых`
  }`;

  return (
    <>
      <div className='card__container'>
        <img className='card__image' alt='Фото статьи' src={firstCardPhoto} />
        {pathname === '/saved-news' && (
          <div className='card__keyword-container'>
            <p className='card__keyword'>Природа</p>
          </div>
        )}
        <div className={
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
          <p className='card__date'>2 августа, 2019</p>
          <p className='card__title'>Национальное достояние – парки</p>
          <p className='card__description'>
            В 2016 году Америка отмечала важный юбилей: сто лет назад здесь
            начала складываться система национальных парков – охраняемых
            территорий, где и сегодня каждый может приобщиться к природе.
          </p>
        </div>
        <p className='card__sourse'>Лента.ру</p>
      </div>

      <div className='card__container'>
        <img className='card__image' alt='Фото статьи' src={secondCardPhoto} />
        {pathname === '/saved-news' && (
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
                : `card__button card__button_delete`
            }
          ></button>
        </div>
        <div className='card__text'>
          <p className='card__date'>2 августа, 2019</p>
          <p className='card__title'>
            Лесные огоньки: история одной фотографии
          </p>
          <p className='card__description'>
            В 2016 году Америка отмечала важный юбилей: сто лет назад здесь
            начала складываться система национальных парков.
          </p>
        </div>
        <p className='card__sourse'>Медуза</p>
      </div>

      <div className='card__container'>
        <img className='card__image' alt='Фото статьи' src={thirdCardPhoto} />
        {pathname === '/saved-news' && (
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
                : `card__button card__button_delete`
            }
          ></button>
        </div>
        <div className='card__text'>
          <p className='card__date'>2 августа, 2019</p>
          <p className='card__title'>
            «Первозданная тайга»: новый фотопроект Игоря Шпиленка
          </p>
          <p className='card__description'>
            В 2016 году Америка отмечала важный юбилей: сто лет назад здесь
            начала складываться система национальных парков – охраняемых
            территорий, где и сегодня каждый может приобщиться к природе.
          </p>
        </div>
        <p className='card__sourse'>Медиазона</p>
      </div>
    
      <div className='card__container'>
        <img className='card__image' alt='Фото статьи' src={fourthCardPhoto} />
        {pathname === '/saved-news' && (
          <div className='card__keyword-container'>
            <p className='card__keyword'>Природа</p>
          </div>
        )}
        <div className={
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
          <p className='card__date'>2 августа, 2019</p>
          <p className='card__title'>Национальное достояние – парки</p>
          <p className='card__description'>
            В 2016 году Америка отмечала важный юбилей: сто лет назад здесь
            начала складываться система национальных парков – охраняемых
            территорий, где и сегодня каждый может приобщиться к природе.
          </p>
        </div>
        <p className='card__sourse'>Медуза</p>
      </div>

      <div className='card__container'>
        <img className='card__image' alt='Фото статьи' src={fifthCardPhoto} />
        {pathname === '/saved-news' && (
          <div className='card__keyword-container'>
            <p className='card__keyword'>Природа</p>
          </div>
        )}
        <div className={
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
          <p className='card__date'>2 августа, 2019</p>
          <p className='card__title'>Национальное достояние – парки</p>
          <p className='card__description'>
            В 2016 году Америка отмечала важный юбилей: сто лет назад здесь
            начала складываться система национальных парков – охраняемых
            территорий, где и сегодня каждый может приобщиться к природе.
          </p>
        </div>
        <p className='card__sourse'>Медуза</p>
      </div>

      <div className='card__container'>
        <img className='card__image' alt='Фото статьи' src={sixthCardPhoto} />
        {pathname === '/saved-news' && (
          <div className='card__keyword-container'>
            <p className='card__keyword'>Природа</p>
          </div>
        )}
        <div className={
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
          <p className='card__date'>2 августа, 2019</p>
          <p className='card__title'>Национальное достояние – парки</p>
          <p className='card__description'>
            В 2016 году Америка отмечала важный юбилей: сто лет назад здесь
            начала складываться система национальных парков – охраняемых
            территорий, где и сегодня каждый может приобщиться к природе.
          </p>
        </div>
        <p className='card__sourse'>Медуза</p>
      </div>
</>
  );
}

export default NewsCard;
