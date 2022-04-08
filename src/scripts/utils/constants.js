const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}
const userConfig = {
  nameSelector: '.profile__info-name',
  descriptionSelector: '.profile__info-description',
  avatar: '.profile__avatar'
};
const profileEditButton = document.querySelector('.profile__edit-button');
const cardsAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCards = document.querySelector('.popup_type_add');
const popupOpenCard = document.querySelector('.popup_type_card');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__info-name');
const popupName = document.querySelector('.popup__input_type_name');
const profileDescription = document.querySelector('.profile__info-description');
const popupDescription = document.querySelector('.popup__input_type_description');
const formEditProfile = document.querySelector('.popup__form_type_edit');
const formAddCard = document.querySelector('.popup__form_type_add');
const popupAddInputTitle = document.querySelector('.popup__input_type_caption-title');
const popupAddInputUrl = document.querySelector('.popup__input_type_url');
const elements = document.querySelector('.elements');
const cardsData = {};
const popupDelete = document.querySelector('.popup_type_deleteConfirm');
const popupAvatar = document.querySelector('.popup_type_change-avatar');
const formAvatar = document.querySelector('.popup__form_type_change-avatar');
const avatarChangeButton =document.querySelector('.profile__avatar_change');

export { userConfig, configValidation, profileEditButton, cardsAddButton, popupEditProfile, popupAddCards, popupOpenCard, popupCloseButtons,
  profileName, popupName,  profileDescription, popupDescription, formEditProfile, formAddCard, popupAddInputTitle, popupAddInputUrl, elements, cardsData, popupDelete, popupAvatar, formAvatar, avatarChangeButton};
