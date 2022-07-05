
import { cardConfig } from "../utils/constants";
export default class Card {
  constructor(data, userId, handlers) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._likes = data.likes;
    this._handleCardClick = handlers.open;
    this._handleLikeClick = handlers.like;
    this._handleDelete = handlers.delete;
    this._isLike = false;
  }

  getId() {
    return this._id;
  }

  getIsLike() {
    return this._isLike;
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
    this._likeCount = this._element.querySelector(cardConfig.likeCount);
    this._fillElements();
    this._initSubscribtions();
    return this._element;
  }

  _fillElements() {
    this._element.id = Card.getId(this._id);
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this.refreshLikes(this._likes);
    if (!this._isMyCard()) {
      this._delete.remove();
    }
  }

  _initSubscribtions() {
    this._like.addEventListener('click', () => this._handleLike())
    this._delete.addEventListener('click', () => this._handleDelete(this))
    this._image.addEventListener('click', () => this._handleOpen())
  }

  refreshLikes(likes) {
    this._likes = likes;
    const likesCount = this._likes.length;
    this._likeCount.textContent = likesCount > 0 ? likesCount : '';
    if (likesCount > 0 && this._likes.some(x => x._id === this._userId)) {
      this._like.classList.add(cardConfig.active);
      this._isLike = true;
    } else {
      this._like.classList.remove(cardConfig.active);
      this._isLike = false;
    }
  }

  _handleLike() {
    this._handleLikeClick(this);
  }

  remove() {
    this._element.remove();
    this._dispose();
  }

  _handleOpen() {
    this._handleCardClick({ name: this._name, link: this._link });
  }

  _isMyCard() {
    return this._userId === this._ownerId;
  }

  _dispose() {
    this._element = null;
    this._image = null;
    this._title = null;
    this._like = null;
    this._delete = null;
  }

  static getIdSelector(cardId) {
    return `#c${cardId}`;
  }

  static getId(cardId) {
    return `c${cardId}`;
  }
}
