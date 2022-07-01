export default class Popup {
  constructor(selector, config) {
    this._popup = document.querySelector(selector);
    this._container = this._popup.querySelector(config.containerSelector);
    this._openModifier = config.openModifier;
    this._handleEscCloseBind = this._handleEscClose.bind(this);
    this._buttonCloseClass = config.buttonCloseClass;
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keyup', this._handleEscCloseBind);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target === this._popup || evt.target === this._container || evt.target.classList.contains(this._buttonCloseClass)) {
        this.close();
      }
    })
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keyup', this._handleEscCloseBind);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
