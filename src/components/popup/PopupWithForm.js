import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupConfig, selector, formConfig, submitHandler) {
    super(popupConfig, selector)
    this._form = this._popup.querySelector(formConfig.formSelector);
    this._submitHandler = submitHandler;
    this._submitButton = this._form.querySelector(formConfig.submitSelector);
    this._submitButtonText = this._submitButton.textContent;
    this._inputList = Array.from(this._form.querySelectorAll(formConfig.inputSelector));
    this._onOpenEvent = formConfig.onOpenEvent;
  }

  _getInputValues() {
    return this._inputList.map(input => input.value);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues())
    });
  }

  fillForm(data) {
    const dataValues = Object.values(data);

    this._inputList.forEach((item, index) => {
      if (dataValues[index]) {
        item.value = dataValues[index];
      }
    });
  }

  open() {
    const event = new CustomEvent(this._onOpenEvent);
    this._form.dispatchEvent(event);
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
