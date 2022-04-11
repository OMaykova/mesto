import {userConfig, configValidation, profileEditButton, cardsAddButton, popupEditProfile, popupAddCards, popupOpenCard,
   popupName, popupDescription, formEditProfile, formAddCard, cardsData, popupDelete, popupAvatar, formAvatar, avatarChangeButton}
   from '../scripts/utils/constants.js';
import {initialCards} from '../scripts/utils/cards.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {Card} from '../scripts/components/Card.js';
import {Section} from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage} from '../scripts/components/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import '../pages/index.css';
import {PopupConfirm} from '../scripts/components/PopupConfirm.js';
import {api} from '../scripts/components/Api.js';


// Создание класса информации о пользователе
const { nameSelector, descriptionSelector, avatar} = userConfig;
const userInfo = new UserInfo(nameSelector, descriptionSelector, avatar);

// Идентификатор пользователя
let userId;

// Блок создания запросов на сервер
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([res, cardList]) =>{
    userInfo.setUserInfo(res);
    userInfo.setAvatar(res.avatar);
    userId = res._id;
    cardList.forEach (obj => {
      const card = createClassCard({
      caption: obj.name,
      link: obj.link,
      likes: obj.likes,
      id: obj._id,
      userId: userId,
      ownerId: obj.owner._id
      })
    initialCardList.addItem(card)
    })
  })
  .catch(console.log)

// Создание экземпляра класса popup с картинкой
const popUpWithImg = new PopupWithImage(popupOpenCard);

// Создание экземпляра класса popup удаления карточки
const popupDeleteConfirm = new PopupConfirm({
  popupSelector: popupDelete})
// Инициализация экземпляра класса Card
function createClassCard (data) {
  const card = new Card({
    data,
    handleCardClick: (caption, link) => {
      popUpWithImg.open(caption, link)
    },
    handleDeleteClick: (id) => {
      popupDeleteConfirm.open();
      popupDeleteConfirm.changeHandlerSubmit(() => {
        api.deleteCard(id)
          .then(() => {
            card.deleteCard();
            popupDeleteConfirm.close()
          })
          .catch(console.log)
      })
    },
    handleLikeClick: (id) => {
      if(card.isLiked()) {
        api.removeLike(id)
          .then(res =>
            card.setLike(res.likes))
          .catch(console.log)
      } else {
        api.setLike(id)
          .then(res =>
            card.setLike(res.likes))
          .catch(console.log)
      }
    }
  }, '.element_template');
  const cardElement = card.createCard();
  return cardElement;
}

// Инициализация галереи
const initialCardList = new Section({
  data: cardsData,
  renderer: (el) => {
    const cardElement = createClassCard(el);
    initialCardList.addItem(cardElement);
  },
}, '.elements');

// Создание класса popup добавления новой карточки(пользовательской)
const popupAddUserCard = new PopupWithForm({
  popupSelector: popupAddCards,
  handleFormSubmit: (data) => {
    popupAddUserCard.changeButtonText('Сохранение...');
    api.addUserCard(data)
      .then(res => {
        console.log('Это res',res)
        const cardElement = createClassCard({caption: res.name, link: res.link, likes: res.likes, id: res._id, ownerId: res.owner._id, userId});
        initialCardList.addUserItem(cardElement);
        popupAddUserCard.close();
      })
      .catch(console.log)
      .finally(() => {popupAddUserCard.changeButtonText('Создать')})
  }
})

// Создание экземпляра класса popup редактирования имени и профессии
const popupEdit = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (data) => {
    popupEdit.changeButtonText('Сохранение...');
    const { name, description } = data;
    api.editProfile(name, description)
      .then(res => {
        userInfo.setUserInfo(res);
        popupEdit.close();
      })
      .catch(console.log)
      .finally(() => {popupEdit.changeButtonText('Сохранить')})
  }
})

// Создание экземпляра класса popup смены аватара
const popupChangeAvatar = new PopupWithForm({
  popupSelector: popupAvatar,
  handleFormSubmit: (data) => {
    popupChangeAvatar.changeButtonText('Сохранение...');
    const {link} = data;
    api.changeAvatar(link)
      .then((res) => {
        userInfo.setAvatar(res.avatar);
        popupChangeAvatar.close();
      })
      .catch(console.log)
      .finally(() => {popupChangeAvatar.changeButtonText('Сохранить')})
  }
})

// Валидация формы профиля
const formEditProfileValidator = new FormValidator(configValidation, formEditProfile);
formEditProfileValidator.enableValidation();
// Валидация формы добавления новой карточки
const formAddCardValidator = new FormValidator(configValidation, formAddCard);
formAddCardValidator.enableValidation();
// Валидация формы смены аватара
const formChangeAvatarValidator = new FormValidator(configValidation, formAvatar);
formChangeAvatarValidator.enableValidation();

// Вызов: добавление слушателей классам popupWithForm
popUpWithImg.setEventListeners();
popupAddUserCard.setEventListeners();
popupEdit.setEventListeners();
popupDeleteConfirm.setEventListeners();
popupChangeAvatar.setEventListeners();

// Добавление слушателя кнопке редактирования профиля
profileEditButton.addEventListener('click', () => {
  formEditProfileValidator.resetErrors();
  const { userName, description } = userInfo.getUserInfo();
  popupName.value = userName;
  popupDescription.value = description;
  formEditProfileValidator.toggleButtonState();
  popupEdit.open();
})

// Добавление слушателя кнопке создания новой карточки
cardsAddButton.addEventListener('click', () => {
  formAddCardValidator.toggleButtonState();
  formAddCardValidator.resetErrors();
  popupAddUserCard.open();
})

// Добавление слушателя аватарке
avatarChangeButton.addEventListener('click', () => {
  formChangeAvatarValidator.toggleButtonState();
  formChangeAvatarValidator.resetErrors();
  popupChangeAvatar.open();
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
// formAddCard.addEventListener('submit', handleFormAddCard)
