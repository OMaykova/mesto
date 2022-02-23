//функция добавления класса с ошибкой
export const showInputError = ((inputErrorClass, errorElement, inputElement, errorMessage) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
})

// функция удаления класса с ошибкой
export const hideInputError = ((inputErrorClass, errorElement, inputElement) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
})

// функция проверки валидности поля
export const isValid = (({inputErrorClass}, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (inputElement.validity.valid) {
    hideInputError(inputErrorClass, errorElement, inputElement);
  }
  else {
    showInputError(inputErrorClass, errorElement, inputElement, inputElement.validationMessage);
}
})

// функция деактивации кнопки submit
export const disabledButton = (inactiveButtonClass, button) => {
  button.setAttribute('disabled', '');
  button.classList.add(inactiveButtonClass);
}

// функция активации кнопки submit
export const enabledButton = (inactiveButtonClass, button) => {
  button.removeAttribute('disabled');
  button.classList.remove(inactiveButtonClass);
}

// функция валидации кнопки после проверки валидности формы
export const toggleButtonState = (inactiveButtonClass, formElement, button) => {
if (formElement.checkValidity()) {
  enabledButton(inactiveButtonClass, button);
} else {
  disabledButton(inactiveButtonClass, button);
}
}

// функция добавления слушателя всем полям формы
export function setFormEventListeners({inputSelector, ...rest}, inactiveButtonClass, formElement, button) {
const inputList = Array.from(formElement.querySelectorAll(inputSelector));
inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', () => {
    isValid(rest, formElement, inputElement);
    toggleButtonState(inactiveButtonClass, formElement, button);
  });
});
}

// функция обработки отправки формы
export const submitForm = (event) => {
  event.preventDefault();
}

// функция включения проверки у всех форм
export function enableValidation({formSelector, submitButtonSelector, inactiveButtonClass, ...rest}) {
  const formElements = Array.from(document.querySelectorAll(formSelector));
  formElements.forEach((formElement) => {
    const button = formElement.querySelector(submitButtonSelector);
    formElement.addEventListener('submit', (event) => {
      submitForm(event);
    });
    formElement.addEventListener('reset', () => {
      disabledButton(inactiveButtonClass, button);
    });
    toggleButtonState(inactiveButtonClass, formElement, button);
    setFormEventListeners(rest, inactiveButtonClass, formElement, button);
  });
}
