import { initialCards, classes, validation } from "./constants.js";

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

const buttonEdit = document.querySelector(classes.profile.editButton);
const buttonAdd = document.querySelector(classes.card.create);

const profileForm = document.querySelector(classes.profileForm.form);
const nameInput = profileForm.querySelector(classes.profileForm.nameInput);
const infoInput = profileForm.querySelector(classes.profileForm.infoInput);

const cardsContainer = document.querySelector(classes.cards);

const cardDetailsPopup = createPopup(classes.popup.cardDetails);
const cardDetailsImage = cardDetailsPopup.querySelector(classes.figure.image);
const cardDetailsCaption = cardDetailsPopup.querySelector(classes.figure.caption);

const cardPopupAdd = createPopup(classes.popup.addCard);

const cardForm = document.querySelector(classes.cardForm.form);
const cardName = cardForm.querySelector(classes.cardForm.nameInput);
const cardLink = cardForm.querySelector(classes.cardForm.linkInput);

const cardTemplate = document.querySelector(classes.card.templateId).content;

function createPopup(popupSelector) {
  const popup = document.querySelector(popupSelector);
  //const buttonClose = popup.querySelector(classes.popup.close);
  //buttonClose.addEventListener('click', () => closePopup(popup));

  const container = popup.querySelector(classes.popup.container);

  popup.addEventListener('mousedown', evt => {
    if (evt.target === popup || evt.target === container || evt.target.classList.contains(classes.popup.close)) {
      closePopup(popup);
    }
  })

  return popup;
}

const keyHandler = (evt) => {
  if (evt.key === 'Escape' && keyHandler.popup) {
    closePopup(keyHandler.popup);
  }
}

function openPopup(popup) {
  popup.classList.add(classes.popup.opened);
  keyHandler.popup = popup;
  document.addEventListener('keyup', keyHandler);
}

function closePopup(popup) {
  popup.classList.remove(classes.popup.opened);
  document.removeEventListener('keyup', keyHandler);
}

function loadProfileForm() {
  nameInput.value = profile.getTitle();
  infoInput.value = profile.getSubtitle();
}

function fillCardDetails(data) {
  cardDetailsImage.src = data.link;
  cardDetailsImage.alt = data.name;
  cardDetailsCaption.textContent = data.name;
}

function raiseOpenForm(form) {
  const event = new CustomEvent(validation.onOpen);
  form.dispatchEvent(event);
}

function initSubscriptions() {
  buttonEdit.addEventListener('click', () => {
    loadProfileForm();
    raiseOpenForm(profileForm);
    openPopup(profilePopup);
  });

  profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profile.setTitle(nameInput.value);
    profile.setSubtitle(infoInput.value);
    closePopup(profilePopup);
  });

  buttonAdd.addEventListener('click', () => {
    cardForm.reset();
    raiseOpenForm(cardForm);
    openPopup(cardPopupAdd);
  });

  cardForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const card = renderCard({ name: cardName.value, link: cardLink.value });
    cardsContainer.prepend(card);
    closePopup(cardPopupAdd);
  })
}

function renderCards() {
  initialCards.forEach(data => {
    const card = renderCard(data);
    cardsContainer.append(card);
  })
}

function renderCard(data) {
  const card = cardTemplate.cloneNode(true);
  const image = card.querySelector(classes.card.image);
  const title = card.querySelector(classes.card.title);
  const like = card.querySelector(classes.card.like);
  const deleteButton = card.querySelector(classes.card.delete);

  image.src = data.link;
  image.alt = data.name;

  image.addEventListener('click', () => {
    fillCardDetails(data);
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
