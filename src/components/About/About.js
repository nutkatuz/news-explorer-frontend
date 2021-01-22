import React from 'react';
import {useLocation} from 'react-router-dom';
import myPhoto from '../../images/me.jpg'
import './About.css';
// About — презентационный компонент, который показывает информацию об авторе;

function About(props) {
  const { pathname } = useLocation();

  return (
    <>
    {pathname === '/' 
    ?(
    <div className='section'>
      <section className='about'>
        <img className='about__photo' src={myPhoto} alt='Фото' />
        <div className='about__text'>
            <h2 className='about__heading'>О проекте</h2>
            <p className='about__description'>Добро пожаловать на сайт! Введите в поисковую строку любое ключевое слово, например, "природа" или "Навальный", а данное веб-приложение найдёт новости по запросу в глобальном поиске за последние 7 дней и отобразит на странице ссылки на ресурсы. Вы можете сохранить понравившиеся новостные карточки в своём личном кабинете.
            </p>
            <p className='about__description'>Мы рады вам!&#9825;
            </p>
        </div>
      </section>
    </div>
    )
    :('')
    }
    </>
  );
}

export default About;