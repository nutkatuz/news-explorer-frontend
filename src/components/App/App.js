import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import Login from "../Login";
import Register from "../Register";
import InfoTooltip from "../InfoTooltip";
import api from '../../utils/NewsApi';
import * as auth from '../../utils/MainApi';
import "./App.css";

function App() {

  // объекты
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();


  // Авторизация:
    const [name, setName] = useState(null)

    async function getCurrentUser() {
      try {
        const userInfo = await auth.api.getUserData();
        setCurrentUser(userInfo);
      } catch (err) {
        console.log(`getCurrentUser ${err}`);
      }
    }
    
  //Auth

  function handleLogin (email, password) {
    setIsLoading(true);
    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          console.log('Установил токен ' + res.token);
          auth.getUserInfo(res.token)
          // setName(res.name);
          setLoggedIn(true);
          closeAllPopups();
        }
      })
      .catch((err) => {
        if (err === 400) {
          console.log('Не передано одно из полей');
        } else if (err === 401) {
          console.log('Неправильные почта или пароль');
        }
        console.log('Ошибка логина: ' + err);
        setLoggedIn(false)
      })
      .finally(() =>{
        setIsLoading(false);
      })
  }

  function handleRegister(email, password, name) {
    setIsLoading(true);
    auth.register(email, password, name)
      .then((res) => {
        console.log(res); // при 400 приходит андеф, иначе мыло с _id
        if (res.status !== 400) {
        setIsOpenRegister(false);
        setIsOpenPopupInfo(true);
        } 
      })
      .catch((err) => {
        if (err.code === 400) {
          console.log(err.message);
        }
        console.log('Ошибка регистрации: ' + err); // при регистрации не может быть 401
      })
      .finally(() =>{
        setIsLoading(false);
      })
  }

  function handleLogOut () {
    setLoggedIn(false);
    setName(null);
    localStorage.removeItem('jwt');
  }

  function tokenCheck() { // для того чтобы не регаться каждый раз
    const token = localStorage.getItem('jwt');
    console.log('tokenCheck, токен: ' + token);
    if (token) {
      auth.getUserInfo(token)
        .then((res) => { //res.json()
          if (res) {
            setLoggedIn(true);
            setName(res.name);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log('Ошибка проверки tokenCheck: ' + err);
          setLoggedIn(false);
          setName('');
        })
    } else {
      console.log('нет токена на tokenCheck: ' + token);
    }
  }

  useEffect(() => {
    tokenCheck();
  }, [localStorage]);

  useEffect(() => {
    if (!loggedIn) return;
      getCurrentUser();
  }, [loggedIn]);
  
  // Карточки
  // const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  }

  React.useEffect(() => {
    if (isSubmitted) {
      api.search(searchQuery).then(data => {
        setCards(data.articles.map((item) => ({
          source: item.source.name,
          title: item.title,
          description: item.description,
          url: item.url,
          urlToImage: item.urlToImage,
          publishedAt: item.publishedAt,
          // author: item.author,
          // content: item.content,
        }))
        );
        setIsSubmitted(false);
        setSearchQuery('');
      //   setCards ([{
      //     link: 'https://i.ytimg.com/vi/pmePvnsl67M/maxresdefault.jpg'
      //   }]);
      
      });
    }
  }, [isSubmitted, searchQuery]);
  
        // console.log(cards)

  // Модальные окна:
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenPopupInfo, setIsOpenPopupInfo] = useState(false); // InfoTooltip
  const [errorServerMessage, setErrorServerMessage] = useState("");

  function handleAuthClick() { // при нажатии на Авторизоваться
    setIsOpenLogin(true);
  }

  function closeAllPopups() {
    setIsOpenLogin(false);
    setIsOpenRegister(false);
    setIsOpenPopupInfo(false);
  }
  function handleOpenLogin() {
    setIsOpenLogin(true);
    setErrorServerMessage("");
  }

  function handleRedirect(evt) {
    evt.preventDefault();
    if (isOpenPopupInfo) {
      setIsOpenLogin(true);
      setIsOpenPopupInfo(false);
      setErrorServerMessage("");
    } else {
      if (isOpenLogin) {
        setIsOpenLogin(false);
        setIsOpenRegister(true);
        setErrorServerMessage("");
      } else {
        setIsOpenRegister(false);
        setIsOpenLogin(true);
        setErrorServerMessage("");
      }
    }
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <Header
                name={name}
                loggedIn={loggedIn}
                onLogIn={handleAuthClick}
                onOpenLogin={handleOpenLogin}
                onSignOut={handleLogOut}
                handleSubmit={handleSubmit}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isSubmitted={isSubmitted}
              />
              <Main
                loggedIn={loggedIn}
                isSubmitted={isSubmitted}
                cards = {cards}
                keyWord= {searchQuery}
              />
            </Route>
            <Route path="/saved-news">
              <Header
                name={name}
                loggedIn={loggedIn}
                onLogIn={handleAuthClick}
                onOpenLogin={handleOpenLogin}
                onSignOut={handleLogOut}
                handleSubmit={handleSubmit}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isSubmitted={isSubmitted}
              />
              <SavedNews name={name} />
            </Route>
          </Switch>
          <Footer />

        <Login
          isOpen={isOpenLogin}
          onClose={closeAllPopups}
          onServerErrorMessage={errorServerMessage}
          redirect={handleRedirect}
          onLogin={handleLogin}
        />
        <Register
          isOpen={isOpenRegister}
          onClose={closeAllPopups}
          onServerErrorMessage={errorServerMessage}
          redirect={handleRedirect}
          onRegister={handleRegister}
        />
        <InfoTooltip
          isOpen={isOpenPopupInfo}
          onClose={closeAllPopups}
          redirect={handleRedirect}
        />
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
