import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
// import { useFormWithValidation } from "../hooks/useValidation"; легче всё прописать здесь, чем постоянно обращаться к хуку 

function Register(props) {

  const [data, setData] = useState({ email: "", password: "", name: "" });

  // Валидация полей
  
  const [validationMessage, setValidationMessage] = useState({ email: "", password: "", name: "" });
  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
    name: false,
  });
  const isButtonSaveActive = !Object.values(isValid).every(Boolean);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsValid({
      ...isValid,
      [name]: e.target.validity.valid,
    });
    setValidationMessage({
      ...validationMessage,
      [name]: e.target.validationMessage,
    });
  }

  // Кнопка

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(data.email, data.password, data.name); // в App
  }


  // Ресетим форму

  useEffect(() => {
    if (!props.isOpen) {
      setData({ email: "", password: "", name: "" });
      setValidationMessage({ email: "", password: "", name: "" });
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="popup_auth"
      title="Регистрация"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      errorServerMessage={props.errorServerMessage}
    >
      <fieldset className="popup__form-auth">
        <label className="popup__label">Email</label>
        <input
          className="popup__input"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          required
          minLength="6"
          maxLength="20"
          placeholder="Введите почту"
          autoComplete="email"
        />
        <span className="popup__error_visible">{validationMessage.email}</span>

        <label className="popup__label">Пароль</label>
        <input
          className="popup__input"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          required
          minLength="8"
          maxLength="20"
          placeholder="Введите пароль"
          autoComplete="password"
        />
        <span className="popup__error_visible">
          {validationMessage.password}
        </span>

        <label className="popup__label">Имя</label>
        <input
          className="popup__input"
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="20"
          placeholder="Введите свое имя"
          autoComplete="off"
        />
        <span className="popup__error_visible">{validationMessage.name}</span>
      </fieldset>

      <button
        type="submit"
        className={`popup__button-save ${
          isButtonSaveActive && "popup__button-save_disabled"
        }`}
        disabled={isButtonSaveActive}
      >
        Зарегистрироваться
      </button>

      <div className="popup__redirect">
        <p className="popup__redirect-paragraph">или</p>
        <button onClick={props.redirect} className="popup__redirect-link">
          Войти
        </button>
      </div>
    </PopupWithForm>
  );
}

export default Register;
