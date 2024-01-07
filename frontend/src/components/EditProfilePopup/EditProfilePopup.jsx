import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../CurrentUserContext/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}){
  const currentUser = useContext(CurrentUserContext)
  const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()
  
  useEffect(() => {
    setValue("name", currentUser.name)
    setValue("subname", currentUser.about)
  },[currentUser, setValue])

  function resetForClose(){
    onClose()
    reset({ name: currentUser.name, subname: currentUser.about })
  }

  function handleSubmit(evt){
    evt.preventDefault()
    onUpdateUser({ name: values.name, subname: values.subname }, reset)
  }
  return(
    <PopupWithForm
      name='type_profil'
      title='Редактировать профиль'
      titleButton='Сохранить'
      isOpen = {isOpen}
      onClose = {resetForClose}
      isValid = {isValid}
      onSubmit={handleSubmit}
    >
      <div className="popup__form-input">
        <input
          id="name"
          type="text"
          className={`popup__input popup__input_type_name ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__input_type_error'}`}
          name="name"
          required=""
          minLength={2}
          maxLength={40}
          //autoComplete="off"
          placeholder="Введите имя"
          value={values.name ? values.name : ''}
          onChange={handleChange}
        />
        <span
          id="error-name"
          className="popup__input-error name-input-error form__input-error"
        >
            {errors.name}
        </span>
      </div>
      <div className="popup__form-input">
        <input
          id="subname"
          type="text"
          className={`popup__input popup__input_type_subname ${isInputValid.subname === undefined || isInputValid.subname ? '' : 'popup__input_type_error'}`}
          name="subname"
          required=""
          minLength={2}
          maxLength={200}
          //autoComplete="off"
          placeholder="Расскажите о себе"
          value={values.subname ? values.subname : ''}
          onChange={handleChange}
        />
        <span
          id="error-subname"
          className="popup__input-error subname-input-error form__input-error"
        >
            {errors.subname}
        </span>
      </div>
    </PopupWithForm>
    )
}