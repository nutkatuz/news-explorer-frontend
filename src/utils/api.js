class Api {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  search(query) {
    return fetch(`${this._baseUrl}?q=${query}&apiKey=${this._apiKey}`, {

      // return fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=5d60850ecced411db40f614cd2e175ae`, {

      headers: {
        Authorization: `Client-ID ${this._apiKey}`
      }
    })
    .then(res => res.json());
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/news/v2/everything',
  // baseUrl: 'https://newsapi.org/v2/everything',
  apiKey: '5d60850ecced411db40f614cd2e175ae'
});

export default api;
