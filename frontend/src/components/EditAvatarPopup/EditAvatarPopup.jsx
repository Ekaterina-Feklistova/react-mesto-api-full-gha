import { useRef } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar}){
  const input = useRef()
  const { values, errors, isInputValid, isValid, handleChange, reset} = useFormValidation()

  function resetForClose(){
    onClose()
    reset()
  }

  function handleSubmit(evt){
    evt.preventDefault()
    onUpdateAvatar({avatar: input.current.value}, reset)
  }

  return(
    <PopupWithForm 
      name='avatar'
      title='Обновить аватар'
      titleButton='Сохранить'
      isOpen={isOpen}
      isValid={isValid}
      onClose = {resetForClose}
      onSubmit = {handleSubmit}
    >
      <div className="popup__form-input">
        <input
          ref={input}
          id="avatar"
          type="url"
          className={`popup__input popup__input_type_avatar ${isInputValid.avatar === undefined || isInputValid ? '' : 'popup__input_type_error'}`}
          name="avatar"
          placeholder="Ссылка на картинку"
          required=""
          //autoComplete="off"
          value={values.avatar ? values.avatar : ''}
          onChange={handleChange}
        />
        <span
          id="error-avatar"
          className="popup__input-error avatar-input-error form__input-error"
        >
          {errors.avatar}
        </span>
      </div>
    </PopupWithForm>
  )
}