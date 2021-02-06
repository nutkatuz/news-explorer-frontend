import React from 'react';
import {useLocation} from 'react-router-dom';
import About from "../About/About";
import NewsCardList from '../NewsCardList/NewsCardList';
import './Main.css';

function Main(props) {

  const { pathname } = useLocation();

  return (
    <main className='main'>
      {props.isSearchStarted && (
        <NewsCardList
        isSubmitted={props.isSubmitted}
        keyWord= {props.keyWord}
        onBtnClick={props.onBtnClick}
        />
        )
      }
        {pathname === '/' && <About 
          loggedIn={props.loggedIn}
        />}
    </main>
  );
}

export default Main;