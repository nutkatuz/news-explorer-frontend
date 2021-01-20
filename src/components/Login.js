import React from "react";
import PopupWithForm from "./PopupWithForm/PopupWithForm";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errMessageEmail, setErrMessageEmail] = React.useState("");
  const [errMessagePassword, setErrMessagePassword] = React.useState("");
  const [isButtonSaveDisabled, setButtonSaveDisabled] = React.useState(true);
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrMessageEmail("");
    setErrMessagePassword("");
  };

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
    setErrMessageEmail("");
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
    setErrMessagePassword("");
  };

  React.useEffect(() => {
    if (email && password) {
      setButtonSaveDisabled(false);
    } else {
      setButtonSaveDisabled(true);
    }
  }, [handleChangeEmail, handleChangePassword]);

  React.useEffect(() => {
    if (props.onResetForm) {
      resetForm();
    }
  }, [props.onClose]);

  return (
    <PopupWithForm
      name="popup_auth"
      title="Вход"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <fieldset className="popup__form-auth">
        <label className="popup__label">Email</label>
        <input
          type="email"
          value={email || ""}
          onChange={handleChangeEmail}
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
          value={password || ""}
          onChange={handleChangePassword}
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
