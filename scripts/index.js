import {initialCards} from './utils/cards.js';
import {configValidation} from './utils/constants.js';
import {enableValidation} from './utils/validate.js';
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
const popupCardImage = document.querySelector('.popup__card-image');
const popupCardTitle = document.querySelector('.popup__card-title');
const elements = document.querySelector('.elements');
const templateElement = document.querySelector('.element_template').content;

// функция добавления карточек elements в HTML
function renderInitialCards(el) {
  el.forEach((card) => {
  elements.append(createCard(card));
  });
}
// функция добавления пользовательской карточки в elements в HTML
function renderUserCard(card) {
  elements.prepend(createCard(card));
}

//функция создания карточки из template
function createCard(card) {
  const newCard = templateElement.cloneNode(true);
  const elementImage = newCard.querySelector('.element__image');
  elementImage.src = card.link;
  elementImage.alt = `Фотография ${card.name}`;
  newCard.querySelector('.element__caption-title').textContent = card.name;
  addListener(newCard);
  return newCard;
};

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
function openPopup (el) {
  el.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
};
// функция закрытия любого popup
function closePopup(el) {
  el.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
};
// функция сохранения данных из popup для редактирования профиля
function submitProfileForm(popup) {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(popup);
}

// функция добавления обработчика
function addListener(el) {
  el.querySelector('.element__delete').addEventListener('click', handleDelete);
  const likeButton = el.querySelector('.element__like');
  likeButton.addEventListener('click', () => handleLike(likeButton));
  el.querySelector('.element__image').addEventListener('click', handleCardOpen);
}
// функция удаления карточки
function handleDelete(event) {
  event.target.closest('.element').remove();
}

// функция обработки нажатия лайка
function handleLike(likeButton) {
  likeButton.closest('.element').querySelector('.element__like');
  likeButton.classList.toggle('element__like_active')
}

// функция открытия popup с картинкой
function handleCardOpen(event) {
  popupCardImage.src = event.target.src;
  popupCardTitle.textContent = event.target.closest('.element').querySelector('.element__caption-title').textContent;
  popupCardImage.alt = event.target.alt;
  openPopup(popupOpenCard);
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
  renderUserCard(userData);
  closePopup(popupAddCards);
  formAddCard.reset();
}

// Вызов: валидация формы
enableValidation(configValidation);

// Вызов: закрытие popup по клику на overlay
setOverlayClosePopup();

// вызов: создание карточек из массива
renderInitialCards(initialCards);

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
  openPopup (popupAddCards);
});

// вызов: сохранение данных из popup добавления карточек
formAddCard.addEventListener('submit', handleFormAddCard);
