export class Card {
  constructor({data, handleCardClick}, selector) {
    this._name = data.caption;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this.popupCardImage = document.querySelector('.popup__card-image');
  }

  // функция клонирования template заготовки
  _getTemplate() {
    this._newCard = document.querySelector(this._selector).content.cloneNode(true);
  }
  //функция создания карточки из template
  createCard() {
    this._getTemplate();
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
      this._handleCardClick(this._name, this._link);
    })
  }

  // функция удаления карточки
  _handleDelete() {
    event.target.closest('.element').remove();
  }

  // функция обработки нажатия лайка
  _handleLike() {
    event.target.classList.toggle('element__like_active')
  }
}
