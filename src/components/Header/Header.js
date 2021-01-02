import {React} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header(props) {
    const {loggedIn} = props;
    // const authButtonText = `${loggedIn ? 'Грета' : 'Авторизоваться'}`;

    return (
        <header className='header'>
            <nav className='navigation'>
                <div className='navigation__logo'>NewsExplorer</div>
                <Link to={'/'} className='navigation__link'>Главная</Link>
                <Link to={'/saved-news'} className='navigation__link'>Сохранённые статьи</Link>
                <div className='navigation__link'>{loggedIn 
                ? `Авторизоваться`
                : (
                    <>
                        <p className='navigation__name'>Грета</p>
                        <div className='navigation__logout'/>
                    </>
                )}
                </div>
            </nav>
            <div className='header__content'>
                <h1 className='header__heading'>Что творится в мире?</h1>
                <p className='header__caption'>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <form className='search-form'>
                    <input
                        className='search-form__input'
                        type='text' 
                        placeholder='Введите тему новости'
                        required
                    />
                    <button type='submit' className='search-form__search-button'>Искать</button>
                </form>
            </div>
        </header>
    );
}

export default Header;