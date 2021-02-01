import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
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
  const history = useHistory();
  // Поиск
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false); //не готов
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
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
          console.log("Установил токен " + res.token);
          auth.getUserInfo(res.token);
          setLoggedIn(true);
          closeAllPopups();
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
    history.push("/");
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
  }, [loggedIn]);

  // Поиск

  const handleSubmit = (event) => {
    event.preventDefault();
    setCards([]);
    setIsSubmitted(true);
  };

  React.useEffect(() => {
    if (isSubmitted) {
      api.search(searchQuery)
      .then((data) => {
        setCards(
          data.articles.map((item) => ({
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
        setSearchQuery("");
      });
    }
  }, [isSubmitted, searchQuery]);

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

  // React.useEffect(() => {
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //       api.getUserInfo(jwt)
  //           .then((res) => {
  //               setLoggedIn(true);
  //               setCurrentUser(res.data);
  //               getSavedNews();
  //           })
  //           .catch((err) => console.log(err));
  //   }
  // }, []);

  // setSavedNews ([{
  //   keyword:'h',
  //   title:'h',
  //   description:'h',
  //   publishedAt:'h',
  //   url:'h',
  //   urlToImage:'h',
  //   source:'h',
  // }]);

  //Сoхранение статьи

  function getSavedNews() {
    auth.api
        .getSavedNews()
        .then((news) => setSavedNews(news.data))
        .catch(err => console.log(`Ошибка при загрузке сохранённых новостей: ${err.message}`));
};

  function handleArticleSave(article) {
    if (!loggedIn) return setIsOpenLogin(true);
    const saved = savedNews.find(
      (i) => i.publishedAt === article.publishedAt && i.title === article.title
    );
    if (!saved) {
      auth.api
        .saveArticle(article)
        .then((newArticle) => setSavedNews([newArticle, ...savedNews]))
        .catch((err) => console.log(err));
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
      .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
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
                  loggedIn={loggedIn}
                  isSubmitted={isSubmitted}
                  keyWord={searchQuery}
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
                <SavedNews name={name} />
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
