const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__info-name');
const popupName = document.querySelector('.popup__input_type_name');
const profileDescription = document.querySelector('.profile__info-description');
const popupDescription = document.querySelector('.popup__input_type_description');
const form = document.querySelector('.popup__edit-form');
function openPopup () {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
};
function closePopup() {
  popup.classList.remove('popup_opened');
}
function savePopup() {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup();
}
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
form.addEventListener('submit', savePopup);
