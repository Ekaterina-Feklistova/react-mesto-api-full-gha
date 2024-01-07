//Редактирования Профиля
export const popupProfile = document.querySelector('.popup_type_profil');
export const buttonEditProfilePencil = document.querySelector('.profile__button-info');
export const profileForm = popupProfile.querySelector('.popup__form_type_profil');
export const popupAvatar = document.querySelector('.popup_avatar');
export const avatarForm = popupAvatar.querySelector('.popup__form-avatar');

//Добавить место
export const buttonAddMesto = document.querySelector('.profile__button');
export const editImageForm = document.querySelector('.popup__form-add');

//селекторы
export const templateSelector = '.element__template'
export const popupProfileSelector = '.popup_type_profil';
export const popupAddMestoSelector = '.popup_add';
export const zoomSelector = '.popup_type_zoom-card';
export const cardListSelector = '.elements';
export const popupAvatarSelector = '.popup_avatar';
export const popupDeleteSelector = '.popup_delete';

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_add',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_visible',
    errorSpan: 'form__input-error'
};
export const configUserInfo = {
    profileNameSelector: '.profile__title',
    profileInfoSelector: '.profile__subtitle',
    profileAvatarSelector: '.profile__avatar'
}