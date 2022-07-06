export default class UserInfo {
  constructor(config) {
    this._name = document.querySelector(config.titleSelector);
    this._about = document.querySelector(config.subTitleSelector);
    this._avatar = document.querySelector(config.avatar);
  }

  getUserInfo() {
    return { name: this._name.textContent, about: this._about.textContent }
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  getAvatar() {
    return this._avatar.src;
  }

  setAvatar(url) {
    this._avatar.src = url;
  }

  getUserId() {
    return this._userId;
  }

  init(data) {
    this.setUserInfo(data);
    this.setAvatar(data.avatar);
    this._userId = data.id;
  }
}
