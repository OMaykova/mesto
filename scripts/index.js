const editProfileDescriptionButton = document.querySelector('.editButton');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__closeButton');
const popupSaveButton = document.querySelector('.popup__saveButton');
const profileName = document.querySelector('.profile__info-name');
const popupName = document.querySelector('.popup__name');
const profileDescription = document.querySelector('.profile__info-description');
const popupDescription = document.querySelector('.popup__description');

editProfileDescriptionButton.addEventListener('click', function () {
  popup.classList.remove('popup__hidden');
  popup.classList.add('popup__opened');
});

popupCloseButton.addEventListener('click', function() {
  popup.classList.remove('popup__opened');
  popup.classList.add('popup__hidden');
});

popupSaveButton.addEventListener('click', function() {
  profileName.textContent = popupName.textContent;
  profileDescription.textContent = popupDescription.textContent;
  popup.classList.remove('popup__opened');
  popup.classList.add('popup__hidden');
});
