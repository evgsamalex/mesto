const Methods = {
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  PUT: 'PUT',
}

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return this._get(`${this._baseUrl}/users/me`)
      .then(this._readResponse);
  }

  getInitialCards() {
    return this._get(`${this._baseUrl}/cards`)
      .then(this._readResponse);
  }

  updateUserInfo({ name, about }) {
    return this._send(`${this._baseUrl}/users/me`, Methods.PATCH, { name, about })
      .then(this._readResponse);
  }

  updateAvatar(avatar) {
    return this._send(`${this._baseUrl}/users/me/avatar`, Methods.PATCH, { avatar })
      .then(this._readResponse);
  }

  addCard({ name, link }) {
    return this._send(`${this._baseUrl}/cards`, Methods.POST, { name, link })
      .then(this._readResponse);
  }

  like(cardId, isLike) {
    const method = isLike ? Methods.PUT : Methods.DELETE;

    return this._send(`${this._baseUrl}/cards/likes/${cardId}`, method)
      .then(this._readResponse);
  }

  deleteCard(cardId) {
    return this._send(`${this._baseUrl}/cards/${cardId}`, 'DELETE')
      .then(this._readResponse);
  }

  _readResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`Error while sending request: ${response.status}`);
  }

  _get(url) {
    return fetch(url, {
      method: 'GET',
      headers: this._headers
    })
  }

  _send(url, method, data) {
    return fetch(url, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(data)
    });
  }
}
