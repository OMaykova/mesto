import {configValidation, profileEditButton, cardsAddButton, popupEditProfile, popupAddCards, popupOpenCard, popupCloseButtons,
  profileName, popupName,  profileDescription, popupDescription, formEditProfile, formAddCard, popupAddInputTitle, popupAddInputUrl, elements} from './utils/constants.js';
import {initialCards} from './utils/cards.js';
import {FormValidator} from './components/FormValidator.js';
import {Card} from './components/Card.js';
const formEditProfileValidator = new FormValidator(configValidation, formEditProfile);
const formAddCardValidator = new FormValidator(configValidation, formAddCard);

// функция добавления карточек elements в HTML
function renderInitialCards(data, selector) {
  data.forEach((el) => {
    const card = new Card(el, selector);

    elements.append(card.createCard());
  });
}
// функция добавления пользовательской карточки в elements в HTML
function renderUserCard(data, selector) {
  const card = new Card(data, selector);
  elements.prepend(card.createCard());
}
// функция создания данных карточки пользователя
function createUserData() {
  const userCard = {
      name: popupAddInputTitle.value,
      link: popupAddInputUrl.value
  };
  return userCard;
};
// функция-обработчик закрытия Esc
function handleEscape(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
}

// функция открытия любого popup
export function openPopup (el) {
  el.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
};
// функция закрытия любого popup
function closePopup(el) {
  el.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
  formAddCardValidator.resetErrors();
};
// функция сохранения данных из popup для редактирования профиля
function submitProfileForm(popup) {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(popup);
}

// Функция закрытия popup по клику на overlay и нажатию Esc
function setOverlayClosePopup() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popup) => {
    popup.addEventListener('click', function(event) {
      if (event.target === event.currentTarget) {
      closePopup(popup);
      };
    });
  });
}
// Функция - обработчик открытия popupProfile
function handlePopupProfileEditOpened () {
  openPopup (popupEditProfile);
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}
// Функция - обработчик сохранения данных из popup добавления карточек
function handleFormAddCard() {
  event.preventDefault();
  const userData = createUserData();
  renderUserCard(userData, '.element_template');
  closePopup(popupAddCards);
  formAddCard.reset();
}

// Вызов: валидация формы
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

// Вызов: закрытие popup по клику на overlay
setOverlayClosePopup();

// вызов: создание карточек из массива
renderInitialCards(initialCards, '.element_template');

// вызов: открытие popup для редактирования
profileEditButton.addEventListener('click', handlePopupProfileEditOpened);

// вызов: закрытие любого popup
popupCloseButtons.forEach((btn) => {
  btn.addEventListener('click', function() {
    closePopup(btn.closest('.popup'))
  });
});
// вызов: сохранение данных из popup для редактирования
formEditProfile.addEventListener('submit', function() {
  submitProfileForm(popupEditProfile);
});

// вызов: открытие popup для добавления карточек
cardsAddButton.addEventListener('click', function () {
  // formAddCardValidator.resetErrors();
  openPopup (popupAddCards);
});

// вызов: сохранение данных из popup добавления карточек
formAddCard.addEventListener('submit', handleFormAddCard);
