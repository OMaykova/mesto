const profileEditButton = document.querySelector('.profile__edit-button');
const cardsAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCards = document.querySelector('.popup_type_add');
const popupOpenCard = document.querySelector('.popup_type_card');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__info-name');
const popupName = document.querySelector('.popup__input_type_name');
const profileDescription = document.querySelector('.profile__info-description');
const popupDescription = document.querySelector('.popup__input_type_description');
const formEdit = document.querySelector('.popup__form_type_edit');
const formAdd = document.querySelector('.popup__form_type_add');
const popupAddInputTitle = document.querySelector('.popup__input_type_caption-title');
const popupAddInputUrl = document.querySelector('.popup__input_type_url');
const popupCardImage = document.querySelector('.popup__card-image');
const popupCardTitle = document.querySelector('.popup__card-title');
import {initialCards} from './modules/cards.js';
const elements = document.querySelector('.elements');
const templateElement = document.querySelector('.element_template').content;



// функция добавления карточек elements в HTML
function render(el) {
  el.forEach((card) => {
  elements.append(createCard(card));
  });
}
// функция добавления пользовательской карточки в elements в HTML
function renderUserCard(el) {
  el.forEach((card) => {
  elements.prepend(createCard(card));
  });
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
function createUserData(){
  const userCard = [
    {
      name: popupAddInputTitle.value,
      link: popupAddInputUrl.value
    }
  ];
  return userCard;
}

// функция открытия любого popup
function openPopup (event) {
  event.classList.add('popup_opened');
};
// функция закрытия любого popup
function closePopup(event) {
  event.classList.remove('popup_opened');
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
  el.querySelector('.element__like').addEventListener('click', handleLike);
  el.querySelector('.element__image').addEventListener('click', handleCardOpen);
}
// функция удаления карточки
function handleDelete(event) {
  event.target.closest('.element').remove();
}

// функция обработки нажатия лайка
function handleLike(event) {
  const like = event.target.closest('.element').querySelector('.element__like');
  like.classList.toggle('element__like_active')
}

// функция открытия popup с картинкой
function handleCardOpen(event) {
  popupCardImage.src = event.target.src;
  popupCardTitle.textContent = event.target.closest('.element').querySelector('.element__caption-title').textContent;
  popupCardImage.alt = event.target.alt;
  openPopup(popupOpenCard);
}







//функция добавления класса с ошибкой
  const showInputError = ((formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    // errorElement.classList.add('popup__input-error_active');
})

// функция удаления класса с ошибкой
  const hideInputError = ((formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    // errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
});

// функция проверки валидности поля
const isValid = ((formElement, inputElement) => {
    if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement);
        }
    else {
      showInputError(formElement, inputElement, inputElement.validationMessage);
  }
})

// функция добавления слушателя всем полям формы
const setFormEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
    });
  });
};

function enableValidation() {
  const formElements = Array.from(document.querySelectorAll('.popup__form'));

  formElements.forEach((formElement) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });
  setFormEventListeners(formElement);
//   const inputList = formElement.querySelectorAll('.popup__input');
//    inputList.forEach(inputElement => {
//     inputElement.addEventListener('input', () => isValid(formElement, inputElement))
// });
});
}
enableValidation();











// вызов: создание карточек из массива
render(initialCards);

// вызов: открытие popup для редактирования
profileEditButton.addEventListener('click', function () {
  openPopup (popupEdit);
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

// вызов: закрытие любого popup
popupCloseButtons.forEach((btn) => {
  btn.addEventListener('click', function() {
    closePopup(btn.closest('.popup'))
  });
});
// вызов: сохранение данных из popup для редактирования
formEdit.addEventListener('submit', function() {
  submitProfileForm(popupEdit);
});

// вызов: открытие popup для добавления карточек
cardsAddButton.addEventListener('click', function () {
  popupAddInputTitle.value = '';
  popupAddInputUrl.value = '';
  openPopup (popupAddCards);
});

// вызов: сохранение данных из popup добавления карточек
formAdd.addEventListener('submit', function() {
  event.preventDefault();
  const userData = createUserData();
  renderUserCard(userData);
  closePopup(popupAddCards);
});
