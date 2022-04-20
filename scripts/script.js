let profile = {
  title: document.querySelector(".profile__title"),
  subTitle: document.querySelector(".profile__subtitle"),
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

function ProfilePopup(className) {
  this.popup = document.querySelector(className);

  let closeButton = this.popup.querySelector(".popup__button-close");

  closeButton.addEventListener('click', () => this.close());

  this.show = () => this.popup.classList.add("popup_opened");

  this.close = () => this.popup.classList.remove("popup_opened");
}

function ProfileForm(className) {
  this.form = document.querySelector(className);
  this.name = this.form.querySelector(".profile-form__name");
  this.info = this.form.querySelector(".profile-form__info");
  this.submit = this.form.querySelector(".profile-form__submit");
  this.save = function (profile) {
    profile.setTitle(this.name.value);
    profile.setSubtitle(this.info.value);
  };

  this.load = function (profile) {
    this.name.value = profile.getTitle();
    this.info.value = profile.getSubtitle();
  };
}

function initSubscriptions() {
  let editButton = document.querySelector(".profile__btn-edit");
  editButton.addEventListener('click', () => {
    profileForm.load(profile);
    profilePopup.show();
  });

  let profileForm = new ProfileForm(".profile-form");
  let profilePopup = new ProfilePopup(".js-profile-popup");

  profileForm.form.addEventListener('submit', evt => {
    evt.preventDefault();
    profileForm.save(profile);
    profilePopup.close();
  });
}

initSubscriptions();
