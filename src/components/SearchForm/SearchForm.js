import React from "react";
import "./SearchForm.css";

function SearchForm(props) {
  
  const [emptyInput, setEmptyInputErr] = React.useState(false);
  
  function handleFormSubmit (event) {
    event.preventDefault();
    if (props.searchQuery.trim() === '') {
      props.setSearchQuery('')
      setEmptyInputErr(true)
    } else { props.handleSubmit() 
      setEmptyInputErr(false)
    }
  }

  return (
    <section className="header__content section">
      <h1 className={"header__title"}>Что творится в мире?</h1>
      <p className="header__caption">
        Находите самые свежие статьи на любую тему и сохраняйте в своём личном
        кабинете.
      </p>

      <form className="search-form" noValidate onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="search-form__input"
          placeholder= {emptyInput ? `Не могу искать пустой запрос ¯\\_(ツ)_/¯ ` : `Введите тему новости`}
          required
          value={props.searchQuery}
          onChange={(event) => props.setSearchQuery(event.target.value)}
        />
        <label className="search-form__label" />
        <button type="submit" className="search-form__search-button">
          Искать
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
