import React, { useContext } from "react";
import {useLocation} from 'react-router-dom';
import { NewsContext } from "../../contexts/NewsContext";
import About from "../About/About";
import NewsCardList from '../NewsCardList/NewsCardList';
import './Main.css';

function Main(props) {

  const { pathname } = useLocation();
  const { cards } = useContext(NewsContext);

  return (
    <main className='main'>
      {props.isSearchStarted && (
        <NewsCardList
        isSubmitted={props.isSubmitted}
        keyWord= {props.keyWord}
        onBtnClick={props.onBtnClick}
        cards = {cards}
        />
        )
      }
        {pathname === '/' &&
        <About 
          loggedIn={props.loggedIn}
        />}
    </main>
  );
}

export default Main;