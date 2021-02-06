import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { NewsContext } from "../../contexts/NewsContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import Login from "../Login";
import Register from "../Register";
import InfoTooltip from "../InfoTooltip";
import api from "../../utils/NewsApi";
import * as auth from "../../utils/MainApi";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute";

function App() {
  // Хуки состояния at the top
  // Авторизация:
  const [currentUser, setCurrentUser] = useState({});
  const [name, setName] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  // Поиск
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false); //не готов
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSearchStarted, setSearchStarted] = useState(false);
  // Модальные окна:
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenPopupInfo, setIsOpenPopupInfo] = useState(false); // InfoTooltip
  const [errorServerMessage, setErrorServerMessage] = useState("");
  // Карточки  //сохранение статеек в лк
  const [savedNews, setSavedNews] = React.useState([]);

  //Auth
  async function getCurrentUser() {
    try {
      const userInfo = await auth.api.getUserData();
      setCurrentUser(userInfo);
      setName(userInfo.name);
    } catch (err) {
      console.log(`getCurrentUser ${err}`);
    }
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          // console.log("Установил токен " + res.token);
          auth.getUserInfo(res.token);
          setLoggedIn(true);
          closeAllPopups();
          getSavedNews();
        }
      })
      .catch((err) => {
        if (err === 400) {
          console.log("Не передано одно из полей");
        } else if (err === 401) {
          console.log("Неправильные почта или пароль");
        }
        console.log("Ошибка логина: " + err);
        setLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegister(email, password, name) {
    setIsLoading(true);
    auth
      .register(email, password, name)
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
        console.log("Ошибка регистрации: " + err); // при регистрации не может быть 401
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogOut() {
    setLoggedIn(false);
    setName(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("news");
    setSearchStarted(false);
  }

  function tokenCheck() {
    // для того чтобы не регаться каждый раз
    const token = localStorage.getItem("jwt");
    console.log("tokenCheck, токен: " + token);
    if (token) {
      auth
        .getUserInfo(token)
        .then((res) => {
          //res.json()
          if (res) {
            setLoggedIn(true);
            setName(res.name);
          }
        })
        .catch((err) => {
          console.log("Ошибка проверки tokenCheck: " + err);
          setLoggedIn(false);
          setName("");
        });
    } else {
      console.log("нет токена на tokenCheck: " + token);
    }
  }

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);

  useEffect(() => {
    if (!loggedIn) return;
    getCurrentUser();
    getSavedNews(); // загрузка сохраненок
  }, [loggedIn]);

  // Загрузка изначальных карточек
  //Если пользователь закрыл вкладку, а после — вернулся на сайт, нужно достать данные из локального хранилища при монтировании компонента App. Выстройте работу с локальным хранилищем и стейт-переменной setCards в правильном порядке.

  React.useEffect(() => {
    const localStorageNews = JSON.parse(localStorage.getItem("news"));
    if (localStorageNews && localStorageNews.length) {
      setCards(localStorageNews);
      setSearchStarted(true);
    }
  }, []);

  // Поиск

  React.useEffect(() => {
    if (isSubmitted) {
      api
        .search(searchQuery)
        .then((data) => {
          const news = data.articles.map((item) => ({
            source: item.source.name,
            title: item.title,
            description: item.description,
            url: item.url,
            urlToImage: item.urlToImage,
            publishedAt: item.publishedAt,
            // author: item.author,
            // content: item.content,
            keyword: searchQuery,
          }));
          setCards(news);
          localStorage.setItem("news", JSON.stringify(news));
          setIsSubmitted(false);
          setSearchQuery("");
          setSearchStarted(true);
        })
        .catch((err) => console.log("ошибка поиска"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted, searchQuery]);

  const handleSubmit = () => {
    setCards([]);
    setIsSubmitted(true);
    // setSearchStarted(true);
  };

  // Модальные окна:

  function handleAuthClick() {
    // при нажатии на Авторизоваться
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

  // Карточки  //сохранение статеек в лк

  function getSavedNews() {
    auth.api
      .getSavedNews()
      .then(
        (news) =>
          // console.log(news)
          setSavedNews(news)
        // date: "2016-09-18T17:34:02.666Z"
        // image: "https://i.pinimg.com/564x/eb/01/78/eb01788546b8c8eab15485970ce0e3b9.jpg"
        // keyword: "статья"
        // link: "http://jj.com"
        // source: "источник"
        // text: "текст"
        // title: "заголовок"
        // _id: "5fe1b4d3fc763d12488892ee"
      )
      .catch((err) => console.log(`Ошибка getSavedNews: ${err.message}`));
  }

  function handleBtnClick(article) {
    if (!loggedIn) return setIsOpenLogin(true);
    const saved = savedNews.find(
      (i) => i.publishedAt === article.publishedAt && i.title === article.title
    );
    // console.log(article);
    if (!saved) {
      auth.api
        .saveArticle(article)
        .then((newArticle) => setSavedNews([newArticle, ...savedNews]))
        .catch((err) => console.log(`Ошибка handleBtnClick: ${err.message}`));
      return;
    }
    handleDeleteArticle(saved);
  }

  function handleDeleteArticle(article) {
    auth.api
      .deleteArticle(article._id)
      .then(() =>
        setSavedNews(savedNews.filter((item) => item._id !== article._id))
      )
      .catch((err) => console.log(`Ошибка handleDeleteArticle: ${err}`));
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <NewsContext.Provider value={{ cards, savedNews }}>
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
                  isSearchStarted={isSearchStarted}
                  loggedIn={loggedIn}
                  isSubmitted={isSubmitted}
                  keyWord={searchQuery}
                  onBtnClick={handleBtnClick}
                />
              </Route>
              <ProtectedRoute
                path="/saved-news"
                loggedIn={loggedIn}
                isRedirect={handleAuthClick}
              >
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
                <SavedNews
                  isSearchStarted={isSearchStarted}
                  loggedIn={loggedIn}
                  isSubmitted={isSubmitted}
                  keyWord={searchQuery}
                  onBtnClick={handleBtnClick}
                  name={name}
                />
              </ProtectedRoute>
            </Switch>
            <Footer />

            <Login
              isOpen={isOpenLogin}
              onClose={closeAllPopups}
              onServerErrorMessage={errorServerMessage}
              redirect={handleRedirect}
              onLogin={handleLogin}
              loading={isLoading}
            />
            <Register
              isOpen={isOpenRegister}
              onClose={closeAllPopups}
              onServerErrorMessage={errorServerMessage}
              redirect={handleRedirect}
              onRegister={handleRegister}
              loading={isLoading}
            />
            <InfoTooltip
              isOpen={isOpenPopupInfo}
              onClose={closeAllPopups}
              redirect={handleRedirect}
            />
          </div>
        </NewsContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
