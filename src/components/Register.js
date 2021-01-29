import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm/PopupWithForm";

function Register(props) {
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
    props.onRegister(data.email, data.password, data.name); // в App
  }
  
// допиши про валидацию
  const [errMessageEmail, setErrMessageEmail] = useState("");
  const [errMessagePassword, setErrMessagePassword] = useState("");
  const [errMessageName, setErrMessageName] = useState("");
  const [isButtonSaveDisabled, setButtonSaveDisabled] = useState(false);

  useEffect(() => {
    if (!props.isOpen) {
      setData({
        email: '',
        password: '',
        name: ''
      });
      setErrMessageEmail("");
      setErrMessagePassword("");
      setErrMessageName("");
    }
  }, [props.isOpen]);
  
  useEffect(() => {
    if (data.email && data.password && data.name) {
      setButtonSaveDisabled(false);
    } else {
      setButtonSaveDisabled(true);
    }
  }, [handleChange]);

  return (
    <PopupWithForm
      name="popup_auth"
      title="Регистрация"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-auth">
        <label className="popup__label">Email</label>
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          required
          placeholder="Введите почту"
          className="popup__input"
          autoComplete='off'
        />
        <span className="popup__error_visible">{errMessageEmail}</span>
        <label className="popup__label">Пароль</label>
        <input
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          required
          placeholder="Введите пароль"
          className="popup__input"
          autoComplete='off'
        />
        <span className="popup__error_visible">{errMessagePassword}</span>
        <label className="popup__label">Имя</label>
        <input
          name="name"
          value={data.name}
          onChange={handleChange}
          type="text"
          required
          placeholder="Введите свое имя"
          className="popup__input"
          autoComplete='off'
        />
        <span className="popup__error_visible">{errMessageName}</span>
      </fieldset>
      <span className="popup__server-error_visible">
        {props.onServerErrorMessage}
      </span>
      <button
        type="submit"
        className={`popup__button-save ${
          isButtonSaveDisabled && "popup__button-save_disabled"
        }`}
        disabled={isButtonSaveDisabled} >
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
