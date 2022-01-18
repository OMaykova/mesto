const editProfileDescriptionButton = document.querySelector('.editButton');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__closeButton');
const popupSaveButton = document.querySelector('.popup__saveButton');
const profileName = document.querySelector('.profile__info-name');
const popupName = document.querySelector('.popup__name');
const profileDescription = document.querySelector('.profile__info-description');
const popupDescription = document.querySelector('.popup__description');
const form = document.querySelector('.popup__container');

editProfileDescriptionButton.addEventListener('click', function () {
  popup.classList.add('popup__opened');
  popupName.setAttribute('value', profileName.textContent);
  popupDescription.setAttribute('value', profileDescription.textContent);
});

popupCloseButton.addEventListener('click', function() {
  event.preventDefault();
  popup.classList.remove('popup__opened');
  form.reset();
});

form.addEventListener('submit', function() {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  popup.classList.remove('popup__opened');
})
