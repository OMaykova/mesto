class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  }
  editProfile(name, description) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description,
      })
    })
    .then(res => this._getResponseData(res))
  }
  addUserCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.caption,
        link: data.link
      })
    })
    .then(res => this._getResponseData(res))
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._getResponseData(res))
  }
  setLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => this._getResponseData(res))
  }
  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._getResponseData(res))
  }
  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => this._getResponseData(res))
  }
  }
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
      authorization: 'ae237eb9-5aba-4050-8c86-8e74ad63731d',
      'Content-Type': 'application/json'
    }
  })
