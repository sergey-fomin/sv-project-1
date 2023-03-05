class Router {
    constructor(startRoute) {
        this._routes = document.querySelectorAll('[data-route]');
        this.currentRoute = undefined;
        this._createElement();
        this.open(startRoute);

    }

    open(page) {
        this._hideAll();
        this._showRoute(page);
        this.currentRoute = page;

        this._changeRouteInElem();
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

    // Потом удалить, только для теста!!!!
    _createElement() {
        const element = document.createElement('span')
        document.body.append(element);
        element.classList.add('router');
        this._style(element, {
            position: 'fixed',
            inset: 'auto 30px 30px auto',
            backgroundColor: 'red',
            fontSize: '20px',
            color: 'white',
            padding: '5px'
        })
    };

    _style = (node, styles) => Object.keys(styles).forEach(key => node.style[key] = styles[key]);

    _changeRouteInElem() {
        const element = document.querySelector('.router');
        element.innerText = this.currentRoute;
    }

}

export const router = new Router('start-page');
