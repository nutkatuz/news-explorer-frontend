import React from 'react';
import { Link } from 'react-router-dom';
import githubIcon from '../../images/svg/github-icon.svg';
import facebookIcon from '../../images/svg/fb-icon.svg';
import './Footer.css';

const year = new Date().getFullYear()

// Footer — презентационный компонент, который отрисовывает подвал;
function Footer(props) {

    return (
        <footer className='section footer'>
            <p className='footer__copyright'>&copy; {year} Supersite, Powered by News API</p>
            <nav className='footer__container'>
                <div className='footer__links-container'>
                    <Link to={'/'} className='footer__link'>Главная</Link>
                    <a 
                        className='footer__link' 
                        href='https://praktikum.yandex.ru/' 
                        target='blank'>
                        Яндекс.Практикум
                    </a>
                </div>

                <div className='footer__social-icons-container'>
                    <a className='footer__social-icon' href='https://github.com/' target='blank'>
                        <img className='footer__img' src={githubIcon} alt='Иконка Гитхаба' />
                    </a>
                    <a className='footer__social-icon' href='https://www.facebook.com/' target='blank'>
                        <img className='footer__img' src={facebookIcon} alt='Иконка Фейсбука' />
                    </a>
                </div>
            </nav>
        </footer>
    );
}

export default Footer;