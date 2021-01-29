import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm/PopupWithForm";

function Login(props) {
  const [data, setData] = useState( {
    email: '',
    password: '',
    name: ''
  });

  function handleChange (e) {
    const {name, value} = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit (e) {
    e.preventDefault();
    props.onLogin(data.email, data.password); // в App
  }

  useEffect(() => {
    if (data.email && data.password) {
      setButtonSaveDisabled(false);
    } else {
      setButtonSaveDisabled(true);
    }
  }, [handleChange]);

  useEffect(() => {
    if (!props.isOpen) {
      setData({
        email: '',
        password: ''
      });
    }
  }, [props.isOpen]);

// допиши про валидацию
const [errMessageEmail, setErrMessageEmail] = useState("");
const [errMessagePassword, setErrMessagePassword] = useState("");
const [isButtonSaveDisabled, setButtonSaveDisabled] = useState(false);

  return (
    <PopupWithForm
      name="popup_auth"
      title="Вход"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-auth">
        <label className="popup__label">Email</label>
        <input
          type="email"
          value={data.email}
          onChange={handleChange}
          name="email"
          required
          placeholder="Введите почту"
          className="popup__input"
          autoComplete='off'
        />
        <span className="popup__error_visible">{errMessageEmail}</span>
        <label className="popup__label">Пароль</label>
        <input
          type="password"
          value={data.password}
          onChange={handleChange}
          name="password"
          required
          placeholder="Введите пароль"
          className="popup__input"
          autoComplete='off'
        />
        <span className="popup__error_visible">{errMessagePassword}</span>
      </fieldset>
      <span className="popup__server-error_visible">
        {props.onServerErrorMessage}
      </span>
      <button
        type="submit"
        className={`popup__button-save ${
          isButtonSaveDisabled && "popup__button-save_disabled"
        }`}
        disabled={isButtonSaveDisabled}
      >
        Войти
      </button>
      <div className="popup__redirect">
        <p className="popup__redirect-paragraph">или</p>
        <button className="popup__redirect-link" onClick={props.redirect}>
          Зарегистрироваться
        </button>
      </div>
    </PopupWithForm>
  );
}

export default Login;
