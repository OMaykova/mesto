import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputsList = this._form.querySelectorAll('.popup__input');
    this._inputsValues = {};
  }
  // создаем массив с данными полей формы
  _getInputValues() {
    this._inputsList.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }
  // функция отправки данных формы
  _submitForm (evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }
  // добавление слушателей (кнопка закрытия popup, клик по overlay, отправка формы)
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm.bind(this));
  }
  _removeEventListeners() {
    this._form.removeEventListener('submit', this._submitForm);
  }
  // закрытие popup с формой
  close() {
    super.close();
    this._form.reset();
    this._removeEventListeners();
  }
}
