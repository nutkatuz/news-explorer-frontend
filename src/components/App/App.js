import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
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
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSearchStarted, setSearchStarted] = useState(false);
  // Модальные окна:
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenPopupInfo, setIsOpenPopupInfo] = useState(false); // InfoTooltip
  // Ошибки с сервера (валидация)
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
          setErrorServerMessage("Не передано одно из полей");
        } else if (err === 401) {
          setErrorServerMessage("Неправильные почта или пароль");
        }
        // else if (!err) {
        //   setErrorServerMessage("Нет соединения");
        // }
        setErrorServerMessage("Не удалось осуществить вход O_o");
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
          setErrorServerMessage("Попробуйте ещё раз, " + err.message);
        }
        else if (err.code === 409) {
          setErrorServerMessage("Такой user уже есть, " + err.message);
        }
        setErrorServerMessage("Регистрация не выполнена. Измените введенные данные"); // при регистрации не может быть 401
        console.log(err)
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
    if (token) {
      setIsLoading(true)
      auth
        .getUserInfo(token)
        .then((res) => {
          //res.json()
          if (res) {
            setLoggedIn(true);
            setName(res.name);
            setIsOpenLogin(false);
          }
        })
        .catch((err) => {
          console.log("Сервер не узнал токен при tokenCheck: " + err);
          setLoggedIn(false);
          setName("");
        })
        .finally(()=>(
          setIsLoading(false)
        ));
    } else {
      setIsLoading(false)
      console.log("Нет токена при tokenCheck: " + token);
    }
  }

  useEffect(() => {
    if (!loggedIn) {
    tokenCheck();
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    getCurrentUser();
    getSavedNews(); // загрузка сохраненок
  }, [loggedIn]);

  useEffect(() => {
    const localStorageNews = JSON.parse(localStorage.getItem("news"));
    if (localStorageNews && localStorageNews.length) {
      setCards(localStorageNews);
      setSearchStarted(true);
    }
  }, []);

  // Поиск

  useEffect(() => {
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
        .catch((err) => alert("Ошибка поискового запроса"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted, searchQuery]);

  const handleSubmit = () => {
    setCards([]);
    setIsSubmitted(true);
    // setSearchStarted(true);
  };

  // Модальные окна:

  function closeAllPopups() {
    setIsOpenLogin(false);
    setIsOpenRegister(false);
    setIsOpenPopupInfo(false);
  }

  // при нажатии на Авторизоваться

  function handleOpenLogin() {
      setIsOpenLogin(true);
      setErrorServerMessage("");
  }

  function handleRedirect(evt) {
    evt.preventDefault();
    if (isOpenPopupInfo) {
      setIsOpenPopupInfo(false);
      handleOpenLogin();
    } else {
      if (isOpenLogin) {
        setIsOpenLogin(false);
        setIsOpenRegister(true);
        setErrorServerMessage("");
      } else {
        setIsOpenRegister(false);
        handleOpenLogin();
      }
    }
  }

  // Карточки  //сохранение статеек в лк, вначале - новые.

  function getSavedNews() {
    auth.api
      .getSavedNews()
      .then(
        (news) =>
          setSavedNews(news.reverse())
      )
      .catch((err) => setErrorServerMessage(`Ошибка getSavedNews: ${err.message}`));
  }

  function handleBtnClick(article) {
    if (!loggedIn) return handleOpenLogin();
    const saved = savedNews.find(
      (i) => i.publishedAt === article.publishedAt && i.title === article.title
    );
    // console.log(article);
    if (!saved) {
      auth.api
        .saveArticle(article)
        .then((newArticle) => setSavedNews([newArticle, ...savedNews]))
        .catch((err) => setErrorServerMessage(`Ошибка handleBtnClick: ${err.message}`));
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
      .catch((err) => setErrorServerMessage(`Ошибка handleDeleteArticle: ${err}`));
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <NewsContext.Provider value={{ cards, savedNews }}>
          <div className="app">
            <Switch>
              <Route exact path="/">
                <Header
                  name={name}
                  loggedIn={loggedIn}
                  onLogIn={handleOpenLogin}
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
                handleOpenLogin={handleOpenLogin}
                isLoading = {isLoading}
              >
                <Header
                  name={name}
                  loggedIn={loggedIn}
                  onLogIn={handleOpenLogin}
                  onOpenLogin={handleOpenLogin}
                  onSignOut={handleLogOut}
                  handleSubmit={handleSubmit}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  isSubmitted={isSubmitted}
                />
                <SavedNews
                  loggedIn={loggedIn}
                  onBtnClick={handleBtnClick}
                />
              </ProtectedRoute>
            </Switch>
            <Footer />

            <Login
              isOpen={isOpenLogin}
              onClose={closeAllPopups}
              redirect={handleRedirect}
              onLogin={handleLogin}
              loading={isLoading}
              // setErrorServerMessage={setErrorServerMessage}
              errorServerMessage={errorServerMessage}
            />
            <Register
              isOpen={isOpenRegister}
              onClose={closeAllPopups}
              redirect={handleRedirect}
              onRegister={handleRegister}
              loading={isLoading}
              // setErrorServerMessage={setErrorServerMessage}
              errorServerMessage={errorServerMessage}
            />
            <InfoTooltip
              isOpen={isOpenPopupInfo}
              onClose={closeAllPopups}
              redirect={handleRedirect}
            />
          </div>
        </NewsContext.Provider>
      </CurrentUserContext.Provider>
  );
}

export default App;
