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

export const classes = {
  profile: {
    title: ".profile__title",
    subTitle: ".profile__subtitle",
    editButton: ".profile__btn-edit"
  },
  popup: {
    opened: "popup_opened",
    container: ".popup__container",
    close: "popup__button-close",
    profile: ".js-profile-popup",
    cardDetails: ".js-card-details",
    addCard: ".js-card-add",
  },
  cardDetailsPopup: {
    popup: ""
  },
  form: {
    input: ".form__input",
  },
  profileForm: {
    form: ".profile-form",
    nameInput: ".profile-form__name",
    infoInput: ".profile-form__info",
  },
  cardForm: {
    form: ".card-form",
    nameInput: ".card-form__name",
    linkInput: ".card-form__link"
  },
  cards: ".cards",
  card: {
    image: ".card__image",
    info: "card__info",
    title: ".card__title",
    like: ".card__like",
    active: "button-icon_type_like-active",
    delete: ".card__delete",
    templateId: "#card-template",
    create: ".profile__btn-add"
  },
  figure: {
    image: ".figure__image",
    caption: ".figure__caption"
  },
}

export const validation = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  onOpen: "openEvent",
}
