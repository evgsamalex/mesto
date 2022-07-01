import Popup from "./Popup.js";
import { imageConfig } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector(imageConfig.imageSelector);
    this._caption = this._popup.querySelector(imageConfig.captionSelector);
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
    super.open();
  }
}
