export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const pageConfig = {
  buttonAddSelector: ".profile__btn-add",
  buttonEditSelector: ".profile__btn-edit",
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
}

export const forms = {
  profileForm: ".profile-form",
  cardForm: ".card-form"
}

export const imageConfig = {
  imageSelector: ".figure__image",
  captionSelector: ".figure__caption"
}

export const profileConfig = {
  titleSelector: ".profile__title",
  subTitleSelector: ".profile__subtitle",
  editButton: ".profile__btn-edit"
}

export const formConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  onOpenEvent: "openEvent",
}
