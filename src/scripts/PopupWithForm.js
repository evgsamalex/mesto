import Popup from "./Popup";
import { formConfig } from "./constants";

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector)
    this._form = this._popup.querySelector(formConfig.formSelector);
    this._submitHandler = submitHandler.bind(this);
    this._getInputValuesBind = this._getInputValues.bind(this);
  }

  _getInputValues() {
    const elements = Array.from(this._getInputElements());
    return elements.map(x => x.value);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValuesBind())
    });
  }

  _getInputElements() {
    return this._form.querySelectorAll(".form__input");
  }

  fillForm(data) {
    const elements = Array.from(this._getInputElements());

    const dataValues = Object.values(data);

    elements.forEach((item, index, elements) => {
      if (dataValues[index]) {
        item.value = dataValues[index];
      }
    });
  }

  open() {
    const event = new CustomEvent(formConfig.onOpenEvent);
    this._form.dispatchEvent(event);
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
