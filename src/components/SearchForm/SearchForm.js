import React from 'react';
import './SearchForm.css';
// SearchForm — форма поиска, куда пользователь будет вводить запрос;

function SearchForm(props) {
  const {onSearch} = props;

  return (
    <section className='header__content section'>
        <h1 className={'header__title'}>
          Что творится в мире?</h1>
        <p className='header__caption'>
          Находите самые свежие статьи на любую тему и 
          сохраняйте в своём личном кабинете.</p>
        <form className='search-form'>
            <input type='text' 
                className='search-form__input'
                placeholder='Введите тему новости'
                required
            />
            <label className='search-form__label' />
            <button type='submit' 
                    className='search-form__search-button'
                    onClick={onSearch}>
                    Искать
            </button>
        </form>
    </section>
  );
}

export default SearchForm;