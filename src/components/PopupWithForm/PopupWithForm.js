import React from "react";
import './PopupWithForm.css';

function PopupWithForm(props) {
  
  function closeByEsc(evt) {
    if (evt.keyCode === 27) {
      props.onClose();
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", closeByEsc, false);

    return () => {
      document.removeEventListener("keydown", closeByEsc, false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={`popup ${props.isOpen && "popup_state_opened"}`}>
      <div className="popup__overlay" onClick={props.onClose}>
        {""}
      </div>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-icon"
          onClick={props.onClose}
        ></button>
        <form
          name={props.name}
          onSubmit={props.onSubmit}
          method="POST"
          className="popup__form"
          noValidate
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
