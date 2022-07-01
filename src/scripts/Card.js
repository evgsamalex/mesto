
import { cardConfig } from "./constants";
export default class Card {
  constructor(data, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = document.querySelector(cardConfig.templateId).content.querySelector(cardConfig.card);
    return template.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(cardConfig.image);
    this._title = this._element.querySelector(cardConfig.title);
    this._like = this._element.querySelector(cardConfig.like);
    this._delete = this._element.querySelector(cardConfig.delete);
    this._fillElements();
    this._initSubscribtions();
    return this._element;
  }

  _fillElements() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
  }

  _initSubscribtions() {
    this._like.addEventListener('click', () => this._handleLike())
    this._delete.addEventListener('click', () => { this._handleDelete() })
    this._image.addEventListener('click', () => { this._handleOpen() })
  }

  _handleLike() {
    this._like.classList.toggle(cardConfig.active);
  }

  _handleDelete() {
    this._element.remove();
    this._dispose();
  }

  _handleOpen() {
    this._handleCardClick({ name: this._name, link: this._link });
  }

  _dispose() {
    this._element = null;
    this._image = null;
    this._title = null;
    this._like = null;
    this._delete = null;
  }
}
