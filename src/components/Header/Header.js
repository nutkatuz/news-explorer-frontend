import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';
// Header — компонент, который отрисовывает шапку сайта на страницу;

function Header(props) {
  const {loggedIn, onLogOut, onLogIn} = props;
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
      setIsActive(!isActive);
  }

  const className = `${isActive ? 'active ' : ''}`;

  return (
    <div className='background'>
      <header className='section header'>
        
        <p className='header__logo'>NewsExplorer
            <div className={className + 'header__burger'} 
              onClick={handleClick}
            />
        </p>

        <nav className={className + ' header__menu'} >
          
          <Link to={'/'} className='navbar__link'>Главная
          </Link>

          {loggedIn 
          ? 
          (
            <Link to={'/saved-news'} 
                  className='navbar__link'>
                    Сохранённые статьи
            </Link>
          )
          : 
          ('')
          }

          {loggedIn 
          ? 
          ( 
          <button arial-label='Выйти из аккаунта'
                  className='navbar__auth-btn' 
                  onClick={onLogOut}>
            <p className='navbar__name'>Анна Ревидович
            </p>
            <div className='navbar__logout-image'/>
          </button>
          )
          : 
          (
          <button arial-label='Авторизоваться' 
                  className='navbar__auth-btn' 
                  onClick={onLogIn}>
              <p className='navbar__auth-name'>Авторизоваться
              </p>
          </button>
          )
          }
          </nav>
      </header>
      <SearchForm/>
    </div>
  );
}

export default Header;