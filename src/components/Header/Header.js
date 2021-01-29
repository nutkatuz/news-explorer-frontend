import React, { useState } from 'react';
import {useLocation, Link} from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';

import './Header.css';

function Header(props) {
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useLocation();
  function handleClick() {
      setIsActive(!isActive);
  }
  const active = `${isActive ? 'active ' : ''}`;

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
            {props.loggedIn 
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
            {props.loggedIn 
            ? ( 
            <div onClick={props.onSignOut} className='navbar__auth-btn'>
              <p className='navbar__name'>{props.name}
              </p>
              <div className={pathname === '/' 
              ? 'navbar__logout-image'
              :  `${active + 'navbar__logout-image navbar__logout-image_black'}`} />
            </div>
            )
            : (
            <div
              onClick={props.onLogIn}
              className='navbar__auth-btn' >
                <p className='navbar__auth-name'>
                  Авторизоваться
                </p>
            </div>
            )}
            </nav>
        </header>

        {pathname === '/' && (
          <SearchForm 
          handleSubmit={props.handleSubmit}
          searchQuery={props.searchQuery}
          setSearchQuery={props.setSearchQuery}
          isSubmitted={props.isSubmitted}
          />)
        }

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