import {Popup} from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__card-image');
    this._popupTitle = this._popup.querySelector('.popup__card-title');
  }
  // открытие popup с картинкой
  open(caption, link) {
    this._popupImage.src = link;
    this._popupImage.alt = `Фотография ${caption}`;
    this._popupTitle.textContent = caption;
    super.open();
  }
}
