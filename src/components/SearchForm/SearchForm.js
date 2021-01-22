import React from 'react';

import './SearchForm.css';

function SearchForm(props) {
  return (
    <section className='header__content section'>
        <h1 className={'header__title'}>
          Что творится в мире?</h1>
        <p className='header__caption'>
          Находите самые свежие статьи на любую тему и 
          сохраняйте в своём личном кабинете.</p>

        <form className='search-form' onSubmit={props.handleSubmit}>
            <input 
            type='text' 
            className='search-form__input'
            placeholder='Введите тему новости'
            required
            value={props.searchQuery}
            onChange={event => props.setSearchQuery(event.target.value)}
            />
            <label className='search-form__label' />
            <button 
            type='submit' 
            className='search-form__search-button'
            handleClick={()=> props.setSearchQuery('')}>
              Искать
            </button>
        </form>

    </section>
  );
}

export default SearchForm;

// SearchForm — форма поиска, куда пользователь будет вводить запрос;
//handleChange обработчик события изменений
  // const {onSearch, searchQuery} = props;