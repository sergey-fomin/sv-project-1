class Api {
    constructor() { }

    _request(url, method, body) {
        const headers = { 'Content-Type': 'application/json' };
        const config = { method, headers };

        if (this._token) {
            headers['Authorization'] = 'Bearer ' + this._token;
        }

        if (method !== 'GET') {
            config.body = JSON.stringify(body);
        }

        return fetch(
            `http://localhost:8200${url}`,
            config
        ).then((response) => response.json());
    }

    saveToken(token) {
        this._token = token;
        localStorage.setItem('token', token);
    }

    removeToken() {
        this._token = null;
        localStorage.removeItem('token');
    }

    register(request) {
        return this._request('/user/register', 'POST', request);
    }

    login(request) {
        return this._request('/user/login', 'POST', request);
    }

    getProfile() {
        return this._request('/user/profile', 'GET');
    }

    getCards() {
        return this._request('/cards', 'GET');
    }

    deleteCard(request) {
        console.log(request);
        return this._request('/cards', 'POST', request);
    }

    createCard(request) {
        return this._request('/cards', 'POST', request);
    }

}

export const api = new Api();
