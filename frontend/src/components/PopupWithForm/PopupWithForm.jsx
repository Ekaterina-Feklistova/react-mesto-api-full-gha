import React from "react";

export default function PopupWithForm({name, title, titleButton, children, isOpen, onClose, onSubmit, isValid=true}){
  return(
    <div id="popup" className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
        <button type="button" className="popup__close" onClick={onClose}/>
        <h3 className="popup__title">{title}</h3>
        <form name={name} className="popup__form" noValidate onSubmit={onSubmit}>
          {children}
          <button type="submit" className={`popup__submit ${isValid ? '' : 'popup__submit_add'}`}>
            {titleButton}
          </button>
        </form>
      </div>
    </div>
  )
}