import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
  constructor({popupSelector, handleSubmit}) {
    super(popupSelector),
    this._handleSubmit = handleSubmit,
    this._form = this._popup.querySelector('.popup__form');
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => this._submitForm(e));
  }
  // метод подмены колбэка сабмита формы
  changeHandlerSubmit(newHandlerSubmit) {
    this._handleSubmit = newHandlerSubmit
  }
  _submitForm (e) {
    e.preventDefault();
    this._handleSubmit();
  }
}
