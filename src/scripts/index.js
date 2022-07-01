import '../pages/index.css';
import { initialCards, classes, validation } from "./constants.js";
import * as constants from "./constants.js";
import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage';


const userInfo = new UserInfo(classes.profile);

const profilePopup = createPopup(classes.popup.profile);

const buttonEdit = document.querySelector(classes.profile.editButton);
const buttonAdd = document.querySelector(classes.card.create);

const profileForm = document.querySelector(classes.profileForm.form);
const profileFormValidator = new FormValidator(validation, profileForm);
const nameInput = profileForm.querySelector(classes.profileForm.nameInput);
const infoInput = profileForm.querySelector(classes.profileForm.infoInput);

const cardPopupAdd = createPopup(classes.popup.addCard);

const cardForm = document.querySelector(classes.cardForm.form);
const cardFormValidator = new FormValidator(validation, cardForm)
const cardName = cardForm.querySelector(classes.cardForm.nameInput);
const cardLink = cardForm.querySelector(classes.cardForm.linkInput);

function createPopup(popupSelector) {
  const popup = document.querySelector(popupSelector);
  const container = popup.querySelector(classes.popup.container);

  popup.addEventListener('mousedown', evt => {
    if (evt.target === popup || evt.target === container || evt.target.classList.contains(classes.popup.close)) {
      closePopup(popup);
    }
  })

  return popup;
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
  const info = userInfo.getUserInfo();
  nameInput.value = info.title;
  infoInput.value = info.subtitle;
}

function raiseOpenForm(form) {
  const event = new CustomEvent(validation.onOpen);
  form.dispatchEvent(event);
}

const cardPopup = new PopupWithImage(constants.popupsConfig.cardDetails, constants);
cardPopup.setEventListeners();

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, classes.card,
        (data) => cardPopup.open(data));
      return card.generateCard();
    }
  },
  classes.cards);

function initSubscriptions() {
  buttonEdit.addEventListener('click', () => {
    loadProfileForm();
    raiseOpenForm(profileForm);
    openPopup(profilePopup);
  });

  profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo({ title: nameInput.value, subtitle: infoInput.value });
    closePopup(profilePopup);
  });

  buttonAdd.addEventListener('click', () => {
    cardForm.reset();
    raiseOpenForm(cardForm);
    openPopup(cardPopupAdd);
  });

  cardForm.addEventListener('submit', evt => {
    evt.preventDefault();
    cardsSection.addItem({ name: cardName.value, link: cardLink.value });
    closePopup(cardPopupAdd);
  })
}

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

initSubscriptions();



cardsSection.renderItems();

//renderCards();
