export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
  }

//функция добавления класса с ошибкой
  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._settings.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._settings.errorClass);
  }

// функция удаления класса с ошибкой
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._settings.inputErrorClass);
    this._errorElement.classList.remove(this._settings.errorClass);
    this._errorElement.textContent = '';
  }

  // функция проверки валидности поля
  _isValid(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  // функция добавления слушателя всем полям формы
  _setFormEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
    });
  });
  }

// функция активации кнопки submit
  _enabledButton() {
    this._button.removeAttribute('disabled');
    this._button.classList.remove(this._settings.inactiveButtonClass);
  }

  // функция деактивации кнопки submit
  _disabledButton() {
    this._button.setAttribute('disabled', '');
    this._button.classList.add(this._settings.inactiveButtonClass);
  }

// функция валидации кнопки после проверки валидности формы
  _toggleButtonState() {
    if (this._form.checkValidity()) {
      this._enabledButton();
    } else {
      this._disabledButton();
    }
  }

  enableValidation() {
    this._button = this._form.querySelector(this._settings.submitButtonSelector);
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    this._form.addEventListener('reset', () => {
      this._disabledButton();
    });
    this._toggleButtonState();
    this._setFormEventListeners();
  }

  resetErrors() {
    this._form.reset();
    this._inputList.forEach((inputElement) => {
      if (inputElement.classList.contains(this._settings.inputErrorClass)) {
       this._hideInputError(inputElement)
      }
    })
  }
}
