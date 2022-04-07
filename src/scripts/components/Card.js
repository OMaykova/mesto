export class Card {
  constructor({data, handleCardClick, handleDeleteClick, handleLikeClick}, selector) {
    this._name = data.caption;
    this._link = data.link;
    this._likes = data.likes;
    this._selector = selector;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }
  // функция клонирования template заготовки
  _getTemplate() {
    this._newCard = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
  }
  //функция создания карточки из template
  createCard() {
    this._getTemplate();
    this._elementImage = this._newCard.querySelector('.element__image');
    this._elementImage.src = this._link;
    this._elementImage.alt = `Фотография ${this._name}`;
    this._newCard.querySelector('.element__caption-title').textContent = this._name;
    this._likeButton = this._newCard.querySelector('.element__like');
    this._deleteButton = this._newCard.querySelector('.element__delete');
    this._addListener();
    if (this._userId !== this._ownerId) {
      this._deleteButton.style.display = 'none'
    }
    this.setLike(this._likes);
    return this._newCard;
  }

  // функция добавления обработчика
  _addListener() {
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id)
    });
    this._newCard.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

  // функция удаления карточки
  deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  // функция обработки нажатия лайка
  setLike(newlikes) {
    this._likes = newlikes;
    this._likeCount = this._newCard.querySelector('.element__like-count');
    this._likeCount.textContent = this._likes.length;

    if(this.isLiked()) {
      this._likeButton.classList.toggle('element__like_active');
    } else {
      this._likeButton.classList.remove('element__like_active');
    }
  }
  // метод проверки постален ли пользователем лайк карточке
  isLiked() {
    const userCheckLikedCard = this._likes.find(user => user._id === this._userId);
    return userCheckLikedCard;
  }
}
