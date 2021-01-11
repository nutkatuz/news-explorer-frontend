import React from 'react';
import './About.css';
import myPhoto from '../../images/me.jpg'

function About() {

    return (
      <div className='section'>
        <section className='about'>
          <img className='about__photo' src={myPhoto} alt='Фото Ревидович' />
          <div className='about__text'>
              <h2 className='about__heading'>Об авторе</h2>
              <p className='about__description'>Добро пожаловать на сайт! &#10084; Вы можете ввести в поисковую строку некоторые ключевые слова, например, природа или лес, мы найдём карточки пользователей из нашей базы данных и отобразим их на странице. Вы можете сохранить понравившиеся карточки в личном кабинете.&hearts;
              </p>
              <p className='about__description'>Мы рады вам!&#9825;
              </p>
          </div>
        </section>
      </div>
    );
}

export default About;