export class Router {
    constructor(startRoute = undefined) {
        this._routes = document.querySelectorAll('[data-route]');
        startRoute && this.open(startRoute);
    }

    open(page) {
        this._hideAll();
        this._showRoute(page);
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
