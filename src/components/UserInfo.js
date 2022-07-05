import { profileConfig } from "../utils/constants";
export default class UserInfo {
  constructor() {
    this._name = document.querySelector(profileConfig.titleSelector);
    this._about = document.querySelector(profileConfig.subTitleSelector);
    this._avatar = document.querySelector(profileConfig.avatar);
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

  init(data) {
    this.setUserInfo(data);
    this.setAvatar(data.avatar);
  }
}
