import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }){
  const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation()
  
  function resetForClose(){
    onClose()
    reset()
  }

  function handleSubmit(evt){
    evt.preventDefault()
    onAddPlace({ title: values.title, link: values.link }, reset)
  }

  return(
    <PopupWithForm
      name='add'
      title='Новое место'
      titleButton='Создать'
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose = {resetForClose}
      isValid = {isValid}
    >
      <div className="popup__form-input">
        <input
          id="mesto"
          type="text"
          className={`popup__input popup__input_type_mesto ${isInputValid.title === undefined || isInputValid.title ? '' : 'popup__input_type_error'}`}
          name="title"
          placeholder="Название"
          required=""
          minLength={2}
          maxLength={30}
          //autoComplete="off"
          value={values.title ? values.title : ''}
          onChange={handleChange}
        />
        <span
          id="error-mesto"
          className="popup__input-error title-input-error form__input-error"
        >
          {errors.title}
        </span>
      </div>
      <div className="popup__form-input">
        <input
          id="url"
          type="url"
          className={`popup__input popup__input_type_image ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_type_error'}`}
          name="link"
          placeholder="Ссылка на картинку"
          required=""
          //autoComplete="off"
          value={values.link ? values.link : ''}
          onChange={handleChange}
        />
        <span
          id="error-url"
          className="popup__input-error link-input-error form__input-error"
        >
          {errors.link}
        </span>
      </div>
    </PopupWithForm>
  )
}