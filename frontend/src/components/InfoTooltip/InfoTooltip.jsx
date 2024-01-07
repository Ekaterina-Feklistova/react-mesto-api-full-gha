import './InfoTooltip.css'

export default function InfoTooltip({ name, isSuccessful, isOpen, onClose }){
  return(
    <div id="popup" className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
        <div className={`popup__registration ${!isSuccessful ? 'popup__registration_type_error' : 'popup__registration_type_ok'}`}>
        <h2 className="popup__registration-title">
          {isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
        </div>
        <button type="button" className="popup__close" onClick={onClose}/>
      </div>
    </div>    
  )
}