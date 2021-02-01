class Api {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
    // this._date = new Date(Date.now() - 604800000); Wed Jan 20 2021 02:53:01 GMT+0500 (Екатеринбург, стандартное время) JSON.stringify()
    this._date = new Date(Date.now() - 604800000).toJSON();
  }

  search(query) {
    return fetch(`${this._baseUrl}?q=${query}&from=${this._date}&sortBy=publishedAt&pageSize=${this._size}&apiKey=${this._apiKey}`, {
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
