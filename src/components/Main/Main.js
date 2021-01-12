import React from 'react';
import { useLocation } from 'react-router-dom';
import NewsCardList from '../NewsCardList/NewsCardList';
import './Main.css';
// Navigation — компонент, который отвечает за меню навигации на сайте;
// SearchForm — форма поиска, куда пользователь будет вводить запрос;
// NewsCardList — компонент, который управляет отрисовкой карточек на страницу и их количеством;
// NewsCard — компонент новостной карточки;
// About — презентационный компонент, который показывает информацию об авторе;
// Preloader — отвечает за работу прелоудера;

function Main(props) {

  return (
    <main className='main'>
      а зачем мне мейн ?.......
      <NewsCardList/>
    </main>
  );
}

export default Main;