import '../pages/index.css';
import { validation, popups, forms, pageConfig, apiConfig, formConfig, popupConfig, imageConfig, profileConfig } from "../utils/constants";
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

const userInfo = new UserInfo(profileConfig);

const profileFormValidator = new FormValidator(validation, document.querySelector(forms.profileForm));
const cardFormValidator = new FormValidator(validation, document.querySelector(forms.cardForm))
const avatarFormValidator = new FormValidator(validation, document.querySelector(forms.avatarForm));

const cardPopup = new PopupWithImage(popupConfig, popups.cardDetails, imageConfig);
cardPopup.setEventListeners();

const handleError = (err) => console.log(err);

const profilePopup = new PopupWithForm(popupConfig, popups.profile, formConfig, ([name, about]) => {
  profilePopup.renderLoading(true);
  api.updateUserInfo({ name, about })
    .then(data => {
      userInfo.setUserInfo(data)
      profilePopup.close();
    })
    .catch(handleError)
    .finally(() => {
      profilePopup.renderLoading(false);
    })
});
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(popupConfig, popups.addCard, formConfig, ([name, link]) => {
  addCardPopup.renderLoading(true);
  api.addCard({ name, link })
    .then(data => {
      cardsSection.insertItem(data)
      addCardPopup.close();
    })
    .catch(handleError)
    .finally(() => {
      addCardPopup.renderLoading(false);
    })
});
addCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm(popupConfig, popups.avatar, formConfig, ([link]) => {
  avatarPopup.renderLoading(true);
  api.updateAvatar(link)
    .then(data => {
      userInfo.setAvatar(data.avatar)
      avatarPopup.close()
    })
    .catch(handleError)
    .finally(() => {
      avatarPopup.renderLoading(false);
    })
});
avatarPopup.setEventListeners();

const deleteCardPopup = new PopupWithForm(popupConfig, popups.deleteCard, formConfig, () => {
  const card = deleteCardPopup.card;
  if (!card) return;
  api.deleteCard(card.getId())
    .then(() => {
      card.remove()
      deleteCardPopup.close()
    })
    .catch(err => handleError(err))
})
deleteCardPopup.setEventListeners();

const cardHandlers = {
  open: (data) => cardPopup.open(data),
  like: (card) => {
    api.like(card.getId(), !card.getIsLike())
      .then(data => card.refreshLikes(data.likes))
      .catch(handleError)
  },
  delete: (card) => {
    deleteCardPopup.card = card;
    deleteCardPopup.open();
  }
}

const cardsSection = new Section(
  (data) => {
    const card = new Card(data, userInfo.getUserId(), cardHandlers);
    return card.generateCard();
  }
  ,
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.init({ id: user._id, name: user.name, about: user.about, avatar: user.avatar })
    cards.forEach(item => {
      cardsSection.addItem(item);
    })
  })
  .catch(err => handleError(err))
