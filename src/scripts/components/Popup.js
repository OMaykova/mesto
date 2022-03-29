export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this)
  }
// открытие popup
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
// закрытие popup
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
// коллбэк-функция для события ESC
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    };
  }
// коллбэк-функция для события клик на overlay
  _handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    };
  }
// добавление слушателей кнопка закрытия popup и клик по overlay
  setEventListeners() {
    this._closeBtn = this._popup.querySelector('.popup__close-button');
    this._closeBtn.addEventListener('click', () => { this.close() });
    this._popup.addEventListener('mousedown', (event) => { this._handleOverlayClose(event)});
  }
}
