import React from "react";

export default function ImagePopup({ card, onClose }){
  return(
    <div id="popup-zoom" className={`popup popup_type_zoom-card ${card && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_zoom">
        <button
          type="button"
          className="popup__close popup__close_zoom"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <div className="popup__zoom-obertka">
          <img 
            className="popup__zoom-image" 
            src={card?.link}
            alt={card?.name}
          />
          <h2 className="popup__zoom-title">{card?.name}</h2>
        </div>
      </div>
    </div>
  )
}