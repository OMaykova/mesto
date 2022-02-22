//функция добавления класса с ошибкой
const showInputError = ((inputErrorClass, errorElement, inputElement, errorMessage) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
})

// функция удаления класса с ошибкой
const hideInputError = ((inputErrorClass, errorElement, inputElement) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
})

// функция проверки валидности поля
const isValid = (({inputErrorClass}, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (inputElement.validity.valid) {
    hideInputError(inputErrorClass, errorElement, inputElement);
  }
  else {
    showInputError(inputErrorClass, errorElement, inputElement, inputElement.validationMessage);
}
})

// функция деактивации кнопки submit
const disabledButton = (inactiveButtonClass, button) => {
  button.setAttribute('disabled', '');
  button.classList.add(inactiveButtonClass);
}

// функция валидации кнопки после проверки валидности формы
const isButtonValid = (inactiveButtonClass, formElement, button) => {
if (formElement.checkValidity()) {
  button.removeAttribute('disabled');
  button.classList.remove(inactiveButtonClass);
} else {
  disabledButton(inactiveButtonClass, button);
}
}

// функция добавления слушателя всем полям формы
function setFormEventListeners({inputSelector, ...rest}, inactiveButtonClass, formElement, button) {
const inputList = Array.from(formElement.querySelectorAll(inputSelector));
inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', () => {
    isValid(rest, formElement, inputElement);
    isButtonValid(inactiveButtonClass, formElement, button);
  });
});
}

// функция обработки отправки формы
const formSubmit = (event, formElement) => {
event.preventDefault();
if(!formElement.classList.contains('popup__form_type_edit') && formElement.checkValidity()) {
  formElement.reset();
}
}

// функция включения проверки у всех форм
function enableValidation({formSelector, submitButtonSelector, inactiveButtonClass, ...rest}) {
const formElements = Array.from(document.querySelectorAll(formSelector));
formElements.forEach((formElement) => {
  const button = formElement.querySelector(submitButtonSelector);
  formElement.addEventListener('submit', (event) => {
    formSubmit(event, formElement);
  });
  formElement.addEventListener('reset', () => {
    disabledButton(inactiveButtonClass, button);
  });
isButtonValid(inactiveButtonClass, formElement, button);
setFormEventListeners(rest, inactiveButtonClass, formElement, button);
});
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
