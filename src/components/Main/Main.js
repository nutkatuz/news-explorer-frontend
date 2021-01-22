import React from 'react';
import About from "../About/About";
import NewsCardList from '../NewsCardList/NewsCardList';
import './Main.css';
// Main, SavedNews — компоненты главной страницы и страницы с сохранёнными карточками;

function Main(props) {

  return (
    <main className='main'>
      <NewsCardList
        isSubmitted={props.isSubmitted}
        cards = {props.cards}
      />
      <About 
        loggedIn={props.loggedIn}
      />
    </main>
  );
}

export default Main;