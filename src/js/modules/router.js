class Router {
    constructor(startRoute) {
        this._routes = document.querySelectorAll('[data-route]');
        this.currentRoute = undefined;
        this.open(startRoute);
    }

    open(page) {
        this._hideAll();
        this._showRoute(page);
        this.currentRoute = page;
    }

    _hideAll() {
        this._routes.forEach(
            (element) => element.setAttribute('hidden', '')
        );
    }

    _showRoute(page) {
        Array.from(this._routes)
        .filter(
            (element) => element.attributes['data-route'].value === page
        ).forEach(
(element) => element.removeAttribute('hidden')
        );
    }
}

export const router = new Router('start-page');
