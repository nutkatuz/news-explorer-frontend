import React, { useState } from 'react';
import {useLocation, Link} from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';
// Header — компонент, который отрисовывает шапку сайта на страницу;
// Navigation — компонент, который отвечает за меню навигации на сайте;
// SavedNewsHeader — компонент, который выводит на страницу «Сохранённые статьи» информацию о количестве сохранённых карточек, а также о связанных с ними запросах.

function Header(props) {
  const {loggedIn, onLogOut, onLogIn} = props;
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useLocation();
  function handleClick() {
      setIsActive(!isActive);
  }
  const active = `${isActive ? 'active ' : ''}`;

  const signinButton = () => {
    if (loggedIn) { // пока что вот так (((
      props.onOpenLogin(true);
    }
  };

  return (
    <>
      <div className={pathname === '/' && ('background')}>
        <header className={pathname === '/' 
        ? 'section header'
        : `${isActive ? 'section header' : 'section header header_black'}`}>

          <p className='header__logo'>NewsExplorer
              <button aria-label='Мобильное меню' 
              className={pathname === '/' 
                ? `${active + 'header__burger'}`
                : `${active + 'header__burger header__burger_black'}`
              }
              onClick={handleClick}
              />
          </p>
          <nav className={active + ' header__menu'} >
            <Link to={'/'} className={pathname === '/' 
            ? 'navbar__link navbar__link_wunderlined'
            : 'navbar__link'}>
            Главная
            </Link>
            {loggedIn 
            ? (
              <Link to={'/saved-news'} 
                    className={pathname === '/saved-news' 
                    ? 'navbar__link navbar__link_bunderlined'
                    : 'navbar__link'}>
                      Сохранённые статьи
              </Link>
            )
            : ('')
            }
            {loggedIn 
            ? ( 
            <div
                    className='navbar__auth-btn' 
                    onClick={onLogOut}>
              <p className='navbar__name'>{props.name}
              </p>
              <div onClick={signinButton} className={pathname === '/' 
              ? 'navbar__logout-image'
              :  `${active + 'navbar__logout-image navbar__logout-image_black'}`} />
            </div>
            )
            : (
            <div
              className='navbar__auth-btn' 
              onClick={onLogIn}>
                <p className='navbar__auth-name'>
                  Авторизоваться
                </p>
            </div>
            )}
            </nav>
        </header>

        {pathname === '/' && (<SearchForm />)}

      </div>

      {pathname === '/saved-news' && (
      <section className='section saved-news'>
        <p className='saved-news__subtitle'>Сохранённые статьи</p>
        <h2 className='saved-news__title'>{props.name}, у вас 5 сохранённых статей</h2>
        <p className='saved-news__keywords'>По ключевым словам: <span className='saved-news__span'>Природа, Тайга</span> и <span className='saved-news__span'>2-м другим</span></p>
        </section>)}
    </>
  );
}

export default Header;