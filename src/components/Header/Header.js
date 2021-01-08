import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header(props) {
    const {loggedIn, onAuthClick} = props;

    let isClicked = false;
    // const authButtonText = `${loggedIn ? 'Грета' : 'Авторизоваться'}`;

    const [isActive, setIsActive] = useState(false);

    function handleClick() {
      setIsActive(!isActive);
    //   console.log("jj")
    }

    const className = `${isActive ? 'active' : ''}`;

    return (
        <div className='indents background'>
        <header className='header'>
            <nav className={className + ' header__menu'} >
                <div className='header__logo'>NewsExplorer
                    <div className={className + ' header__burger'} onClick={handleClick}/>
                </div>
                <div className='navigation'>
                    <Link to={'/'} className='navigation__link'>Главная</Link>
                    <Link to={'/saved-news'} className='navigation__link'>Сохранённые статьи</Link>
                    <div className='navigation__auth-btn' onClick={onAuthClick}>
                        {loggedIn 
                        ? (
                            <>
                                <p className='navigation__name'>Анна Ревидович</p>
                                <div className='navigation__logout-image'/>
                            </>
                        )
                        : <p className='navigation__auth-name'>Авторизоваться</p>}
                    </div>
                </div>
            </nav>

            <div className='header__content'>
                <h1 className={className + ' header__title'} >Что творится в мире?</h1>
                <p className='header__caption'>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <form className='search-form'>
                    <input type='text' 
                        className='search-form__input'
                        placeholder='Введите тему новости'
                        required
                    />
                    <button type='submit' className='search-form__search-button'>Искать</button>
                </form>
            </div>
        </header>
        </div>
    );
}

export default Header;