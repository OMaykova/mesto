const profileEditButton = document.querySelector('.profile__edit-button');
const cardsAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCards = document.querySelector('.popup_type_add');
const popupOpenCard = document.querySelector('.popup_type_card');
const closeButton = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__info-name');
const popupName = document.querySelector('.popup__input_type_name');
const profileDescription = document.querySelector('.profile__info-description');
const popupDescription = document.querySelector('.popup__input_type_description');
const formEdit = document.querySelector('.popup__edit-form_type_edit');
const formAdd = document.querySelector('.popup__edit-form_type_add');
const popupAddInputTitle = document.querySelector('.popup__input_type_caption-title');
const popupAddInputUrl = document.querySelector('.popup__input_type_url');
const popupCardImage = document.querySelector('.popup__card-image');
const popupCardTitle = document.querySelector('.popup__card-title');
const initialCards = [
  {
    name: 'Волгодонск',
    link: 'https://kartarf.ru/images/heritage/1080/0/6203.jpg'
  },
  {
    name: 'Томск',
    link: 'https://cont.ws/uploads/pic/2019/6/%D0%A5%D0%B0%D1%84%D0%B8%D0%B7%D0%BE%D0%B2%205%20%281%29.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
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
function savePopup(popup) {
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

// вызов: создание карточек из массива
render(initialCards);

// вызов: открытие popup для редактирования
profileEditButton.addEventListener('click', function () {
  openPopup (popupEdit);
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

// вызов: закрытие любого popup
closeButton.forEach((btn) => {
  btn.addEventListener('click', function() {
    closePopup(btn.closest('.popup'))
  });
});
// вызов: сохранение данных из popup для редактирования
formEdit.addEventListener('submit', function() {
  savePopup(popupEdit);
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
