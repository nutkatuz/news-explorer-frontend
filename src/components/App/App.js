import React, { useState, useCallback } from 'react';
import {  BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PopupWithForm from '../modals/PopupWithForm/PopupWithForm';
import './App.css';
// Примерный список компонентов, которые вам потребуются:
// App — корневой компонент приложения, его создаёт CRA;
// Main, SavedNews — компоненты главной страницы и страницы с сохранёнными карточками;
// Header — компонент, который отрисовывает шапку сайта на страницу;
// Footer — презентационный компонент, который отрисовывает подвал;
// PopupWithForm — отвечает за модальное окно;
// SavedNewsHeader — компонент, который выводит на страницу «Сохранённые статьи» информацию о количестве сохранённых карточек, а также о связанных с ними запросах.

// import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function App() {
  let currentUser
  const [loggedIn, setLoggedIn] = useState(false);
  // const [loggedIn, setLoggedIn] = useState(true);

  return (
    <BrowserRouter>
    <CurrentUserContext.Provider value={currentUser}>
    <div className='app'>      
      <Header
      loggedIn={loggedIn}
      />

      <Switch>
        <Route exact path='/'>
          <Main
          />
        </Route>
        <Route path='/saved-news'>
          <SavedNews
          />
        </Route>
      </Switch>
      
      <Footer
      />

      <PopupWithForm
      />
    </div>
    </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
