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
import "./App.css";

function App() {
  let currentUser;

  // Авторизация:

  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("Анна Ревидович");

  function handleAuthClick() {
    setLoggedIn(!loggedIn);
  }

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
              />
              <Main
                name={name}
                loggedIn={loggedIn}
                onLogIn={handleAuthClick}
                onLogOut={handleAuthClick}
              />
            </Route>
            <Route path="/saved-news">
              <Header
                name={name}
                loggedIn={loggedIn}
                onLogIn={handleAuthClick}
                onLogOut={handleAuthClick}
                // onSearch={handleSearch}
                onOpenLogin={handleOpenLogin}
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
