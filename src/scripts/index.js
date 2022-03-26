import {userConfig, configValidation, profileEditButton, cardsAddButton, popupEditProfile, popupAddCards, popupOpenCard,
   popupName, popupDescription, formEditProfile, formAddCard} from './utils/constants.js';
import {initialCards} from './utils/cards.js';
import {FormValidator} from './components/FormValidator.js';
import {Card} from './components/Card.js';
import {Section} from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage} from './components/PopupWithImage.js';
import { UserInfo } from './components/UserInfo.js';
import '../pages/index.css';

// Создание класса popup с картинкой
const popUpWithImg = new PopupWithImage(popupOpenCard);

// Создание класса карточек галереи
const initialCardList = new Section({
  data: initialCards,
  renderer: (el) => {
    const card = new Card({
      data: el,
      handleCardClick: (caption, link) => {
        popUpWithImg.open(caption, link)
      }
    }, '.element_template');
    const cardElement = card.createCard();
    initialCardList.addItem(cardElement);
  },
}, '.elements');

// Создание класса popup добавления новой карточки(пользовательской)
const popupAddUserCard = new PopupWithForm({
  popupSelector: popupAddCards,
  handleFormSubmit: (data) => {
    // const userData = createUserData();
    renderUserCard(data);
    popupAddUserCard.close();
  }
})

// Создание класса информации о пользователе
const { nameSelector, descriptionSelector} = userConfig;
const userInfo = new UserInfo(nameSelector, descriptionSelector);

// Создание класса popup редактирования имени и профессии
const popupEdit = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupEdit.close();
  }
})

// Функция добавления пользовательской карточки в elements в HTML
function renderUserCard(data) {
  const card = new Card({
    data: data,
    handleCardClick: (caption, link) => {
      popUpWithImg.open(caption, link)
    }
  }, '.element_template');
  const cardElement = card.createCard();
  initialCardList.addUserItem(cardElement);
}

// Валидация формы профиля
const formEditProfileValidator = new FormValidator(configValidation, formEditProfile);
formEditProfileValidator.enableValidation();
// Валидация формы добавления новой карточки
const formAddCardValidator = new FormValidator(configValidation, formAddCard);
formAddCardValidator.enableValidation();

// Вызов метода добавления галереи в HTML
initialCardList.renderItems();

// Вызов: добавление слушателей
popUpWithImg.setEventListeners();
popupAddUserCard.setEventListeners();
popupEdit.setEventListeners();

// Добавление слушателя кнопке редактирования профиля
profileEditButton.addEventListener('click', () => {
  const { userName, description } = userInfo.getUserInfo();
  popupName.value = userName;
  popupDescription.value = description;
  formEditProfileValidator._toggleButtonState();
  formEditProfileValidator.resetErrors();
  popupEdit.open();
})

// Добавление слушателя кнопке создания новой карточки
cardsAddButton.addEventListener('click', () => {
  formAddCardValidator._toggleButtonState();
  formAddCardValidator.resetErrors();
  popupAddUserCard.open();
})

























// функция-обработчик закрытия Esc
// function handleEscape(event) {
//   if (event.key === 'Escape') {
//     closePopup(document.querySelector('.popup_opened'));
//   };
// }

// функция открытия любого popup
// export function openPopup (el) {
//   el.classList.add('popup_opened');
//   document.addEventListener('keydown', handleEscape);
// };
// // функция закрытия любого popup
// function closePopup(el) {
//   el.classList.remove('popup_opened');
//   document.removeEventListener('keydown', handleEscape);
//   formAddCardValidator.resetErrors();
// };


// функция сохранения данных из popup для редактирования профиля
// function submitProfileForm(popup) {
//   event.preventDefault();
//   profileName.textContent = popupName.value;
//   profileDescription.textContent = popupDescription.value;
//   closePopup(popup);
// }

// Функция закрытия popup по клику на overlay и нажатию Esc
// function setOverlayClosePopup() {
//   const popupList = Array.from(document.querySelectorAll('.popup'));
//   popupList.forEach((popup) => {
//     popup.addEventListener('click', function(event) {
//       if (event.target === event.currentTarget) {
//       closePopup(popup);
//       };
//     });
//   });
// }



// Функция - обработчик открытия popupProfile
// function handlePopupProfileEditOpened () {
//   openPopup (popupEditProfile);
//   popupName.value = profileName.textContent;
//   popupDescription.value = profileDescription.textContent;
// }
// Функция - обработчик сохранения данных из popup добавления карточек
// function handleFormAddCard() {
//   event.preventDefault();
//   const userData = createUserData();
//   renderUserCard(userData);
//   closePopup(popupAddCards);
//   formAddCard.reset();
// }



// Вызов: закрытие popup по клику на overlay
// setOverlayClosePopup();


// // вызов: открытие popup для редактирования профиля
// profileEditButton.addEventListener('click', handlePopupProfileEditOpened);

// // вызов: закрытие любого popup
// popupCloseButtons.forEach((btn) => {
//   btn.addEventListener('click', function() {
//     closePopup(btn.closest('.popup'))
//   });
// });


// // вызов: сохранение данных из popup для редактирования
// formEditProfile.addEventListener('submit', function() {
//   submitProfileForm(popupEditProfile);
// });

// // вызов: открытие popup для добавления карточек
// cardsAddButton.addEventListener('click', function () {
//   // formAddCardValidator.resetErrors();
//   openPopup (popupAddCards);
// });

// // вызов: сохранение данных из popup добавления карточек
// formAddCard.addEventListener('submit', handleFormAddCard);
