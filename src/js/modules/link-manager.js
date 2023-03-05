import { router } from './router';
import { api } from './api';
import { authorization } from './authorization';

class LinkManager {
    _links = document.querySelectorAll('[data-link]');

    setupListeters() {
        this._links.forEach((element) => {
            element.addEventListener('click', this._linksHandler);
        });
    }

    _linksHandler = (evt) => {
        evt.preventDefault();
        const linkToRoute = evt.target.attributes['data-link'].value;

        switch(linkToRoute) {
            case 'registration':
                router.open('registration');
                break;
            case 'logout':
                api.removeToken();
                authorization.isAuthorized = false;
            case 'login':
                router.open('login');
                break;
        }
    }
}

const linkManager = new LinkManager();

export { linkManager };
