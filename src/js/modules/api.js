class Api {
    constructor() { }

    _request(url, method, body) {
        const headers = { 'Content-Type': 'application/json' };
        const config = { method, headers };

        if (this._token) {
            headers['Authorization'] = this._token;
        }

        if (method !== 'GET') {
            config.body = JSON.stringify(body);
        }

        return fetch(
            `http://localhost:8200${url}`,
            config
        ).then((response) => response.json());
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

}

export const api = new Api();
