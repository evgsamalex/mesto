export const pageConfig = {
  buttonAddSelector: ".profile__btn-add",
  buttonEditSelector: ".profile__btn-edit",
  buttonAvatarSelector: ".profile__btn-avatar",
  cardsSelector: ".cards"
}

export const cardConfig = {
  card: ".card",
  image: ".card__image",
  info: "card__info",
  title: ".card__title",
  like: ".card__like",
  active: "button-icon_type_like-active",
  delete: ".card__delete",
  templateId: "#card-template",
  likeCount: ".card__likecount",
}

export const validation = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  onOpenEvent: "openEvent",
}

export const popupConfig = {
  openModifier: "popup_opened",
  containerSelector: ".popup__container",
  buttonCloseClass: "popup__button-close",
}

export const popups = {
  profile: ".js-profile-popup",
  cardDetails: ".js-card-details",
  addCard: ".js-card-add",
  avatar: ".js-avatar",
  deleteCard: ".js-delete-card",
}

export const forms = {
  profileForm: ".profile-form",
  cardForm: ".card-form",
  avatarForm: ".avatar-form",
}

export const imageConfig = {
  imageSelector: ".figure__image",
  captionSelector: ".figure__caption"
}

export const profileConfig = {
  titleSelector: ".profile__title",
  subTitleSelector: ".profile__subtitle",
  editButton: ".profile__btn-edit",
  avatar: ".profile__avatar",
  defaultAvatar: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg"
}

export const formConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  onOpenEvent: "openEvent",
  submitSelector: ".form__submit",
}

export const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-45",
  token: "1fd03e6b-d983-4cac-babc-2295aa34ef44"
}
