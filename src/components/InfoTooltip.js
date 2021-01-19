import React from 'react';
import PopupWithForm from './PopupWithForm/PopupWithForm';

function InfoTooltip(props) {    
    return (
        <PopupWithForm name='popup_auth' title='Пользователь успешно зарегистрирован!' isOpen={props.isOpen} onClose={props.onClose} >
            <button className="popup__redirect-link" onClick={props.redirect}>Войти</button>
        </PopupWithForm>
    )
}

export default InfoTooltip;   
