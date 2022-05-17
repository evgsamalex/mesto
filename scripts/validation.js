import { validation } from "./constants.js";

const getErrorElement = (formElement, inputElement) => {
  return formElement.querySelector(`#${inputElement.id}-error`);
}

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = getErrorElement(formElement, inputElement);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validation.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = getErrorElement(formElement, inputElement);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid);
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  formElement.addEventListener('submit', evt => {
    evt.preventDefault();
    if (hasInvalidInput(inputList)) {
      evt.stopImmediatePropagation();
    }
  })

  formElement.addEventListener(config.onOpen, () => {
    toggleButtonState(inputList, buttonElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector))

  forms.forEach(form => {
    setEventListeners(form, config);
  })

}

enableValidation(validation);
