import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import { useFormWithValidation } from "../hooks/useValidation";

function Login(props) {
  // Валидация значений инпутов

  const emailInput = useFormWithValidation();
  const passwordInput = useFormWithValidation();
  const isButtonSaveActive = !(emailInput.isValid && passwordInput.isValid);

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(emailInput.value, passwordInput.value); // в App
  }

  // Ресетим форму

  useEffect(() => {
    if (!props.isOpen) {
      emailInput.setValue("");
      passwordInput.setValue("");
      emailInput.setErrorMessage("");
      passwordInput.setErrorMessage("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="popup_auth"
      title="Вход"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      errorServerMessage={props.errorServerMessage}
    >
      <fieldset className="popup__form-auth">
        <label className="popup__label">Email</label>
        <input
          type="email"
          value={emailInput.value}
          onChange={emailInput.onChange}
          name="email"
          required
          // pattern={/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i}
          placeholder="Введите почту"
          className="popup__input"
          autoComplete="off"
        />
        <span className="popup__error popup__error_visible">
          {emailInput.errorMessage}
        </span>

        <label className="popup__label">Пароль</label>
        <input
          type="password"
          value={passwordInput.value}
          onChange={passwordInput.onChange}
          name="password"
          required
          placeholder="Введите пароль"
          minLength="8"
          className="popup__input"
          autoComplete="off"
        />
        <span className="popup__error popup__error_visible">
          {passwordInput.errorMessage}
        </span>
      </fieldset>

      <button
        type="submit"
        className={`popup__button-save ${
          isButtonSaveActive && "popup__button-save_disabled"
        }`}
        disabled={isButtonSaveActive}
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
