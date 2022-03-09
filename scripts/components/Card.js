import {openPopup} from "../index.js"
import {popupOpenCard} from "../index.js"
export class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  //функция создания карточки из template
  createCard() {
    this._newCard = document.querySelector(this._selector).content.cloneNode(true);
    this._elementImage = this._newCard.querySelector('.element__image');
    this._elementImage.src = this._link;
    this._elementImage.alt = `Фотография ${this._name}`;
    this._newCard.querySelector('.element__caption-title').textContent = this._name;
    this._addListener();
    return this._newCard;
  }

  // функция добавления обработчика
  _addListener() {
    this._newCard.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDelete();
    });
    this._newCard.querySelector('.element__like').addEventListener('click', () => {
      this._handleLike();
    });
    this._newCard.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardOpen();
    });
  }

  // функция удаления карточки
  _handleDelete() {
    event.target.closest('.element').remove();
  }

  // функция обработки нажатия лайка
  _handleLike() {
    console.log(event.target);
    event.target.classList.toggle('element__like_active')
  }

  // функция открытия popup с картинкой
  _handleCardOpen() {
    const popupCardImage = document.querySelector('.popup__card-image');
    popupCardImage.src = this._link;
    document.querySelector('.popup__card-title').textContent = this._name;
    popupCardImage.alt = this._name;
    openPopup(popupOpenCard);
  }
}
