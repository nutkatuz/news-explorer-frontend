export const BASE_URL = 'https://api.tesla.students.nomoredomains.icu';

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password, name})
  })
  .then((res) => {
    if (res.ok) {
      console.log(`${res.status} MainApi ok`)
      return res.json();
    }
    console.log(`${res.status} MainApi reject`)
    return Promise.reject(res.status);
  })
  .catch(err => console.log(err))
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response => response.json()))
  .then((data) => {
    if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
    }
  })
  .catch(err => console.log(err))
};

// export const getContent = (token) => {
export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  })
  .catch(err => console.log(err))
}


class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this.baseUrl = baseUrl
    this.headers = headers
  }

  _getHeaders() {
    const token = localStorage.getItem('jwt')
    return {
      ...this.headers,
      'Authorization': `Bearer ${token}`,
    }
  }

  _processingRes(res) {
    if (res.ok) {
      return res.json()
    } else {
    return Promise.reject(`Ошибка при обращении к серверу: ${res.status}`)
    }
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this._getHeaders(),
    })
    .then(this._processingRes)
  }

  getInitialItems() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this._getHeaders(),
    })
    .then(this._processingRes)
  }

  postItem({name, link}) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name, link
      })
    })
    .then(this._processingRes)
  }

  deleteItem(_id) {
    return fetch(`${this.baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._processingRes)
  }

  patchUserAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(avatar)
    })
    .then(this._processingRes)
  }

  patchUserData({name, about}) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._processingRes)
  }

  changeLikeCardStatus(_id, isLiked) {
    return fetch(`${this.baseUrl}/cards/likes/${_id}`, {
        method: `${isLiked ? 'DELETE' : 'PUT'}`,
        headers: this._getHeaders(),
        body: JSON.stringify({
          _id
        })
      })
      .then(this._processingRes)
  }

}

export const api = new Api({
  baseUrl: 'https://api.tesla.students.nomoredomains.icu',
  // baseUrl: 'https://api.more.students.nomoreparties.xyz',
  headers: {
    'Content-Type': 'application/json'
  }
})
