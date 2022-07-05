import '../pages/index.css';
import { initialCards, validation, popups, forms, pageConfig, apiConfig } from "../utils/constants";
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import PopupWithImage from '../components/popup/PopupWithImage';
import PopupWithForm from '../components/popup/PopupWithForm';
import Api from '../components/Api';


const api = new Api({
  baseUrl: apiConfig.baseUrl,
  headers: {
    authorization: apiConfig.token,
    'Content-Type': 'application/json'
  }
})

const userInfo = new UserInfo();

const profileFormValidator = new FormValidator(validation, document.querySelector(forms.profileForm));
const cardFormValidator = new FormValidator(validation, document.querySelector(forms.cardForm))
const avatarFormValidator = new FormValidator(validation, document.querySelector(forms.avatarForm));

const cardPopup = new PopupWithImage(popups.cardDetails);
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm(popups.profile, ([name, about]) => {
  return api.updateUserInfo({ name, about })
    .then(data => userInfo.setUserInfo(data))
    .then(profilePopup.close())
});
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(popups.addCard, ([name, link]) => {
  cardsSection.addItem({ name, link });
  addCardPopup.close();
});
addCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm(popups.avatar, ([link]) => {
  return api.updateAvatar(link)
    .then(data => userInfo.setAvatar(data.avatar))
    .then(() => avatarPopup.close())
});
avatarPopup.setEventListeners();

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

  const buttonAvatar = document.querySelector(pageConfig.buttonAvatarSelector);
  buttonAvatar.addEventListener('click', () => {
    avatarPopup.fillForm({ link: userInfo.getAvatar() });
    avatarPopup.open();
  })

  profileFormValidator.enableValidation();
  cardFormValidator.enableValidation();
  avatarFormValidator.enableValidation();
}

initSubscriptions();

cardsSection.renderItems();

const loadUserInfo = () => {
  return api.getUserInfo()
    .then(data => {
      userInfo.init({
        id: data._id,
        name: data.name,
        about: data.about,
        avatar: data.avatar
      })
    })
}

loadUserInfo();
