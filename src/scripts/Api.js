class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
getUserInfo() {
  return fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status, res.statusText))
  .catch(console.log)
}
getInitialCards() {
  return fetch(`${this._baseUrl}/cards`, {
    headers: this._headers
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status, res.statusText))
  .catch(console.log)
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
  .then(res => res.ok ? res.json() : Promise.reject(res.status, res.statusText))
  .catch(console.log)
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
  .then(res => res.ok ? res.json() : Promise.reject(res.status, res.statusText))
  .catch(console.log)
}
deleteCard(id) {
  return fetch(`${this._baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: this._headers,
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status, res.statusText))
  .catch(console.log)
}
setLike(id) {
  return fetch(`${this._baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: this._headers,
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status, res.statusText))
  .catch(console.log)
}
removeLike(id) {
  return fetch(`${this._baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: this._headers,
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status, res.statusText))
  .catch(console.log)
}
changeAvatar(link) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status, res.statusText))
  .catch(console.log)
}
}
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'ae237eb9-5aba-4050-8c86-8e74ad63731d',
    'Content-Type': 'application/json'
  }
})
