//#region data

const initialCards = [
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

const classes = {
  profile: {
    title: ".profile__title",
    subTitle: ".profile__subtitle",
    editButton: ".profile__btn-edit"
  },
  popup: {
    opened: "popup_opened",
    container: ".popup__container",
    close: ".popup__button-close",
    profile: ".js-profile-popup",
    cardDetails: ".js-card-details",
    addCard: ".js-card-add",
  },
  cardDetailsPopup: {
    popup: ""
  },
  form: {
    input: ".form__input"
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
  }
}

//#endregion

const profile = {
  title: document.querySelector(classes.profile.title),
  subTitle: document.querySelector(classes.profile.subTitle),
  getTitle: function () {
    return this.title.textContent;
  },
  setTitle: function (value) {
    this.title.textContent = value;
  },
  getSubtitle: function () {
    return this.subTitle.textContent;
  },
  setSubtitle: function (value) {
    this.subTitle.textContent = value;
  }
}

const profilePopup = createPopup(classes.popup.profile);

const editButton = document.querySelector(classes.profile.editButton);
const addButton = document.querySelector(classes.card.create);

const profileForm = document.querySelector(classes.profileForm.form);
const nameInput = profileForm.querySelector(classes.profileForm.nameInput);
const infoInput = profileForm.querySelector(classes.profileForm.infoInput);

const cardsContainer = document.querySelector(classes.cards);

const cardDetailsPopup = createPopup(classes.popup.cardDetails);
const cardDetailsImage = cardDetailsPopup.querySelector(classes.figure.image);
const cardDetailsCaption = cardDetailsPopup.querySelector(classes.figure.caption);

const addCardPopup = createPopup(classes.popup.addCard);

const cardForm = document.querySelector(classes.cardForm.form);
const cardName = cardForm.querySelector(classes.cardForm.nameInput);
const cardLink = cardForm.querySelector(classes.cardForm.linkInput);

function createPopup(popupSelector) {
  const popup = document.querySelector(popupSelector);
  const closeButton = popup.querySelector(classes.popup.close);
  closeButton.addEventListener('click', () => closePopup(popup));

  const container = popup.querySelector(classes.popup.container);

  popup.addEventListener('click', evt => {
    if (evt.target === popup || evt.target === container) {
      closePopup(popup);
    }
  })

  return popup;
}

function openPopup(popup) {
  popup.classList.add(classes.popup.opened);
}

function closePopup(popup) {
  popup.classList.remove(classes.popup.opened);
}

function loadProfileForm() {
  nameInput.value = profile.getTitle();
  infoInput.value = profile.getSubtitle();
}

function clearForm(form) {
  form.querySelectorAll(classes.form.input).forEach(input => {
    input.value = '';
  })
}

function initSubscriptions() {
  editButton.addEventListener('click', () => {
    loadProfileForm();
    openPopup(profilePopup);
  });

  profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profile.setTitle(nameInput.value);
    profile.setSubtitle(infoInput.value);
    closePopup(profilePopup);
  });

  addButton.addEventListener('click', () => {
    clearForm(cardForm);
    openPopup(addCardPopup);
  });

  cardForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const card = renderCard({ name: cardName.value, link: cardLink.value });
    cardsContainer.prepend(card);
    closePopup(addCardPopup);
  })
}

function renderCards() {
  initialCards.forEach(data => {
    const card = renderCard(data);
    cardsContainer.append(card);
  })
}

function renderCard(data) {
  const card = document.querySelector(classes.card.templateId).content.cloneNode(true);
  const image = card.querySelector(classes.card.image);
  const title = card.querySelector(classes.card.title);
  const like = card.querySelector(classes.card.like);
  const deleteButton = card.querySelector(classes.card.delete);

  image.src = data.link;
  image.alt = data.name;

  image.addEventListener('click', (evt) => {
    cardDetailsImage.src = data.link;
    cardDetailsImage.alt = data.name;
    cardDetailsCaption.textContent = data.name;
    openPopup(cardDetailsPopup);
  })

  title.textContent = data.name;

  like.addEventListener('click', (evt) => {
    evt.target.classList.toggle(classes.card.active);
  })

  deleteButton.addEventListener('click', evt => {
    evt.target.closest(".card").remove();
  })

  return card;
}

initSubscriptions();

renderCards();
