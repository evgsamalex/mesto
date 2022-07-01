import '../pages/index.css';
import { initialCards, validation, popups, forms, pageConfig } from "../utils/constants";
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';


const userInfo = new UserInfo();

const profileFormValidator = new FormValidator(validation, document.querySelector(forms.profileForm));
const cardFormValidator = new FormValidator(validation, document.querySelector(forms.cardForm))

const cardPopup = new PopupWithImage(popups.cardDetails);
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm(popups.profile, ([title, subtitle]) => {
  userInfo.setUserInfo({ title, subtitle });
  profilePopup.close();
});
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(popups.addCard, ([name, link]) => {
  cardsSection.addItem({ name, link });
  addCardPopup.close();
});
addCardPopup.setEventListeners();

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, (data) => cardPopup.open(data));
      return card.generateCard();
    }
  },
  pageConfig.cardsSelector);

const initSubscriptions = () => {
  const buttonEdit = document.querySelector(pageConfig.buttonEditSelector);
  buttonEdit.addEventListener('click', () => {
    profilePopup.fillForm(userInfo.getUserInfo());
    profilePopup.open();
  });

  const buttonAdd = document.querySelector(pageConfig.buttonAddSelector);
  buttonAdd.addEventListener('click', () => {
    addCardPopup.open();
  });

  profileFormValidator.enableValidation();
  cardFormValidator.enableValidation();
}

initSubscriptions();

cardsSection.renderItems();
