import {React} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header(props) {
    return (
        <header className='header'>
            <p>NewsExplorer</p>
            <nav className='navigation'>
                <Link to={'/'} className='navigation__link'>Главная</Link>
                <Link to={'/saved-news'} className='navigation__link'>Сохранённые статьи</Link>
                <Link to={'/auth'} className='navigation__link'>Greta</Link>
            </nav>
            <h1>Что творится в мире</h1>
            <p>вевевевевевевевевевевевевевевевевевевевевевевевевевевевевевевер</p>
        </header>
    );
}

export default Header;