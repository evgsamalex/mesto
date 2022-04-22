const classes = {
  profile: {
    title: ".profile__title",
    subTitle: ".profile__subtitle",
    editButton: ".profile__btn-edit"
  },
  popup: {
    opened: "popup_opened"
  },
  profilePopup: {
    popup: ".js-profile-popup",
    close: ".popup__button-close"
  },
  profileForm: {
    form: ".profile-form",
    nameInput: ".profile-form__name",
    infoInput: ".profile-form__info",
  }
}

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

const profilePopup = document.querySelector(classes.profilePopup.popup);
const profileCloseButton = profilePopup.querySelector(classes.profilePopup.close);

const editButton = document.querySelector(classes.profile.editButton);

const profileForm = document.querySelector(classes.profileForm.form);
const nameInput = profileForm.querySelector(classes.profileForm.nameInput);
const infoInput = profileForm.querySelector(classes.profileForm.infoInput);

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

function initSubscriptions() {
  editButton.addEventListener('click', () => {
    loadProfileForm();
    openPopup(profilePopup);
  });

  profileCloseButton.addEventListener('click', () => closePopup(profilePopup));

  profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profile.setTitle(nameInput.value);
    profile.setSubtitle(infoInput.value);
    closePopup(profilePopup);
  });
}

initSubscriptions();
