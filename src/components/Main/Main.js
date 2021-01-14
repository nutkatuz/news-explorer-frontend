import React from 'react';
import { useLocation } from 'react-router-dom';
import NewsCardList from '../NewsCardList/NewsCardList';
import './Main.css';
// Navigation — компонент, который отвечает за меню навигации на сайте;

// NewsCard — компонент новостной карточки;
// About — презентационный компонент, который показывает информацию об авторе;
// Preloader — отвечает за работу прелоудера; у меня в мэйн в общей обертке хэдэр и сёрч форм - обертка даёт фон, хедер узенький вверху, а часть с Что в мире = сёрч форм
// Main, SavedNews — компоненты главной страницы и страницы с сохранёнными карточками;

function Main(props) {

  return (
    <main className='main'>
      {/* <SearchForm /> */}
          <NewsCardList/>
    </main>
  );
}

export default Main;