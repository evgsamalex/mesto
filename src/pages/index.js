import '../pages/index.css';
import { validation, popups, forms, pageConfig, apiConfig } from "../utils/constants";
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

const handleError = (err) => console.log(err);

const profilePopup = new PopupWithForm(popups.profile, ([name, about]) => {
  profilePopup.renderLoading(true);
  api.updateUserInfo({ name, about })
    .then(data => userInfo.setUserInfo(data))
    .catch(handleError)
    .finally(() => {
      profilePopup.renderLoading(false);
      profilePopup.close();
    })
});
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(popups.addCard, ([name, link]) => {
  addCardPopup.renderLoading(true);
  api.addCard({ name, link })
    .then(data => cardsSection.insertItem(data))
    .catch(handleError)
    .finally(() => {
      addCardPopup.renderLoading(false);
      addCardPopup.close();
    })
});
addCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm(popups.avatar, ([link]) => {
  avatarPopup.renderLoading(true);
  api.updateAvatar(link)
    .then(data => userInfo.setAvatar(data.avatar))
    .catch(handleError)
    .finally(() => {
      avatarPopup.renderLoading(false);
      avatarPopup.close()
    })
});
avatarPopup.setEventListeners();

const deleteCardPopup = new PopupWithForm(popups.deleteCard, () => {
  const card = deleteCardPopup.card;
  if (!card) return;
  api.deleteCard(card.getId())
    .then(() => card.remove())
    .catch(err => handleError(err))
    .finally(() => deleteCardPopup.close())
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

const loadCards = () => {
  api.getInitialCards()
    .then(items => {
      items.forEach(item => {
        cardsSection.addItem(item)
      })
    });
}

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

loadUserInfo().then(() => loadCards()).catch(err => handleError(err));
