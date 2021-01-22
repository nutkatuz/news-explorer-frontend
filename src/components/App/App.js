import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import Login from "../Login";
import Register from "../Register";
import InfoTooltip from "../InfoTooltip";
import api from '../../utils/api';
import "./App.css";

function App() {

  // Авторизация:
  let currentUser;
  const [loggedIn, setLoggedIn] = useState(false);
  // const [user, setUser] = useState("Анна Ревидович");
  // const name = "Анна Ревидович";
  // console.log(user)

  const name = "Анна Ревидович";

  function handleAuthClick() {
    setLoggedIn(!loggedIn);
  }

  // Карточки
  // const [cards, setCards] = useState([]);
  const [cards, setCards] = useState([{
    link: 'https://i.ytimg.com/vi/pmePvnsl67M/maxresdefault.jpg'
  }]);
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
  const [isResetForm, setIsResetForm] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenPopupInfo, setIsOpenPopupInfo] = useState(false);
  const [errorServerMessage, setErrorServerMessage] = useState("");

  function closeAllPopups() {
    setIsOpenLogin(false);
    setIsOpenRegister(false);
    setIsOpenPopupInfo(false);
    setIsResetForm(true);
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
        setIsOpenPopupInfo(true);
        setIsOpenRegister(false);
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
                onLogOut={handleAuthClick}
                onOpenLogin={handleOpenLogin}

                handleSubmit={handleSubmit}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isSubmitted={isSubmitted}
              />
              <Main
                name={name}
                loggedIn={loggedIn}
                onLogIn={handleAuthClick}
                onLogOut={handleAuthClick}
                cards = {cards}
              />
            </Route>
            <Route path="/saved-news">
              <Header
                name={name}
                loggedIn={loggedIn}
                onLogIn={handleAuthClick}
                onLogOut={handleAuthClick}
                onOpenLogin={handleOpenLogin}

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
          onResetForm={isResetForm}
          onClose={closeAllPopups}
          onServerErrorMessage={errorServerMessage}
          redirect={handleRedirect}
        />
        <Register
          isOpen={isOpenRegister}
          onResetForm={isResetForm}
          onClose={closeAllPopups}
          onServerErrorMessage={errorServerMessage}
          redirect={handleRedirect}
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
