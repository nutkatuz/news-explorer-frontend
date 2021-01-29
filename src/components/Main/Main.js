import React from 'react';
import About from "../About/About";
import NewsCardList from '../NewsCardList/NewsCardList';
import './Main.css';

function Main(props) {

  return (
    <main className='main'>
      <NewsCardList
        isSubmitted={props.isSubmitted}
        cards = {props.cards}
        keyWord= {props.keyWord}
      />
      <About 
        loggedIn={props.loggedIn}
      />
    </main>
  );
}

export default Main;