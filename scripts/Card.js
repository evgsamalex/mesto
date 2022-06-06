export default class Card {
  constructor(data, config) {
    this._name = data.name;
    this._link = data.link;
    this._config = config;
  }

  _getTemplate() {
    const template = document.querySelector(this._config.templateId).content;
    return template.cloneNode(true);
  }

  generateCard(openHandler) {
    this._template = this._getTemplate();
    this._openHandler = openHandler;
    this._fillElements();
    this._initSubscribtions();
    return this._template;
  }

  _fillElements() {
    const image = this._template.querySelector(this._config.image);
    const title = this._template.querySelector(this._config.title);

    image.src = this._link;
    image.alt = this._name;
    title.textContent = this._name;
  }

  _initSubscribtions() {
    this._template.querySelector(this._config.like).addEventListener('click', (evt) => this._handleLike(evt))
    this._template.querySelector(this._config.delete).addEventListener('click', evt => { this._handleDelete(evt) })
    this._template.querySelector(this._config.image).addEventListener('click', () => { this._handleOpen() })
  }

  _handleLike(evt) {
    evt.target.classList.toggle(this._config.active);
  }

  _handleDelete(evt) {
    evt.target.closest(".card").remove();
  }

  _handleOpen() {
    this._openHandler({ name: this._name, link: this._link });
  }

}
