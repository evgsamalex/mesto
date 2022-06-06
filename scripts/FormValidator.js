export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  enableValidation() {
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._button = this._form.querySelector(this._config.submitButtonSelector);

    this._form.addEventListener('submit', (evt) => {
      if (this._hasInvalidInput()) {
        evt.stopImmediatePropagation();
      }
    });

    this._setEventListeners();
  }

  _setEventListeners() {
    this._form.addEventListener(this._config.onOpen, () => {
      this._resetError();
    })

    this._toggleButtonState();

    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkValidity(input);
        this._toggleButtonState();
      })
    })

  }

  _getErrorElement(input) {
    return this._form.querySelector(`#${input.id}-error`);
  }

  _showInputError(input) {
    input.classList.add(this._config.inputErrorClass);

    const error = this._getErrorElement(input);
    error.textContent = input.validationMessage;
    error.classList.add(this._config.errorClass);
  }

  _hideInputError(input) {
    input.classList.remove(this._config.inputErrorClass);

    const error = this._getErrorElement(input);
    error.textContent = '';
    error.classList.remove(this._config.errorClass);
  }

  _checkValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input)
    } else {
      this._hideInputError(input)
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._config.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  _resetError() {
    this._toggleButtonState();
    this._inputList.forEach(input => {
      this._hideInputError(input);
    })
  }
}
