import { profileConfig } from "../utils/constants";
export default class UserInfo {
  constructor() {
    this._title = document.querySelector(profileConfig.titleSelector);
    this._subtitle = document.querySelector(profileConfig.subTitleSelector);
  }

  getUserInfo() {
    return { title: this._title.textContent, subtitle: this._subtitle.textContent }
  }

  setUserInfo(data) {
    this._title.textContent = data.title;
    this._subtitle.textContent = data.subtitle;
  }
}
