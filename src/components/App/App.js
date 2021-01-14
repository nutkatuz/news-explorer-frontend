import React, { useState, useCallback } from 'react';
import {  BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Header from '../Header/Header';
import About from '../About/About';
import Footer from '../Footer/Footer';
import PopupWithForm from '../modals/PopupWithForm/PopupWithForm';
import './App.css';
// Примерный список компонентов, которые вам потребуются:
// App — корневой компонент приложения, его создаёт CRA;

// Footer — презентационный компонент, который отрисовывает подвал;
// PopupWithForm — отвечает за модальное окно;
// SavedNewsHeader — компонент, который выводит на страницу «Сохранённые статьи» информацию о количестве сохранённых карточек, а также о связанных с ними запросах.

// import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function App() {
  let currentUser
  
  // const [loggedIn, setLoggedIn] = useState(true);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isResultShow, setResultShow] = useState(false);

  function handleAuthClick () {
    setLoggedIn(!loggedIn)
  }

  function handleLoginPopupOpen() {
    setLoginPopupOpen(true);
  }
  function closeAllPopups() {
    setLoginPopupOpen(false);
  }
  function handleSearch() {
    setResultShow(true);
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='app'>
          <Header
            loggedIn={loggedIn}
            onLogIn={handleLoginPopupOpen}
            onLogIn={handleAuthClick}
            onLogOut={handleAuthClick}
            onSearch={handleSearch}
          />

          <Switch>
            <Route exact path='/'>

              <Main>
                <About loggedIn={loggedIn}
                />
              </Main>
              
            </Route>
            
            <Route path='/saved-news'>

              <SavedNews>

              </SavedNews>

            </Route>
          </Switch>
          
          <Footer
          />
{/* 
<PopupWithForm 
        name='update-avatar' 
        title='Обновить аватар' 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
      > 
        <label className="popup__label"> 
          <input 
            className="popup__input popup__input_update-avatar" 
            name="thirdInp" 
            defaultValue="" 
            placeholder="Ссылка на фото" 
            type="url" /> 
          <span className="popup__error"></span> 
        </label> 
        <button className="popup__button" type="submit" 
          aria-label="Обновить фото пользователя">Сохранить</button> 
      </PopupWithForm> 

      <PopupWithForm 
        name='profile-edit' 
        title='Редактировать профиль' 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
      > 
        <label className="popup__label"> 
          <input className="popup__input popup__input_name" type="text" 
            name="firstInp" defaultValue="" placeholder="Имя" 
            autoComplete="name" required minLength="2" maxLength="40"  
          /> 

          <span className="popup__error"></span> 
        </label> 
        <label className="popup__label"> 
          <input className="popup__input popup__input_about" type="text" 
            name="secondInp" defaultValue="" autoComplete="off" 
            placeholder="О себе" required minLength="2" maxLength="200"  
          /> 
          <span className="popup__error"></span> 
        </label> 
        <button className="popup__button" type="submit" 
          aria-label="Сохранить изменения">Сохранить</button> 
      </PopupWithForm> 

      <PopupWithForm 
        name='confirm' 
        title='Новое место' 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups} 
        > 
        <label className="popup__label"> 
          <input className="popup__input popup__input_place-name" name="name" defaultValue="" 
            autoComplete="off" placeholder="Название" type="text" minLength="1" maxLength="30" required /> 
          <span className="popup__error"></span> 
        </label> 
        <label className="popup__label"> 
          <input className="popup__input popup__input_image_url" type="url" 
            inputMode="url" name="link" defaultValue="" 
            placeholder="Ссылка на картинку" required /> 
          <span className="popup__error"></span> 
        </label> 
        <button className="popup__button" type="submit" disabled 
          aria-label="Сохранить новую карточку">Создать 
        </button> 
      </PopupWithForm> 

      <PopupWithForm name='new-card' title='Вы уверены?'> 
        <button className="popup__button" type="submit" 
          aria-label="Подтвердить удаление карточки">Да 
        </button> 
      </PopupWithForm>  */}
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
