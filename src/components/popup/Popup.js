export default class Popup {
  constructor(config, selector) {
    this._config = config;
    this._popup = document.querySelector(selector);
    this._container = this._popup.querySelector(this._config.containerSelector);
    this._openModifier = this._config.openModifier;
    this._handleEscCloseBind = this._handleEscClose.bind(this);
    this._buttonCloseClass = this._config.buttonCloseClass;
  }

  open() {
    this._popup.classList.add(this._config.openModifier);
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
    this._popup.classList.remove(this._config.openModifier);
    document.removeEventListener('keyup', this._handleEscCloseBind);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
