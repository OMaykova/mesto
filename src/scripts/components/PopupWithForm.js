import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputsList = this._form.querySelectorAll('.popup__input');
    this._inputsValues = {};
    this._buttonSubmit = this._form.querySelector('.popup__save-button')
  }
  // создаем массив с данными полей формы
  _getInputValues() {
    this._inputsList.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }
  // метод подмены колбэка сабмита формы
  changeHandlerFormSubmit(newHandlerFormSubmit) {
    this._handleFormSubmit = newHandlerFormSubmit
  }
  // метод изменения надписи кнопки сабмита формы
  changeButtonText(text) {
    this._buttonSubmit.textContent = text;
  }
  // функция отправки данных формы
  _submitForm (evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }
  // добавление слушателей (кнопка закрытия popup, клик по overlay, отправка формы)
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._submitForm(evt));
  }
  // закрытие popup с формой
  close() {
    super.close();
    this._form.reset();
  }
}
