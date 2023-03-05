class Authorization {
    constructor(isAuthorizedOnStart) {
        this.isAuthorized = isAuthorizedOnStart;
        this._createElement();
        isAuthorizedOnStart ? this.showAuthorizedContent() : this.showUnauthorizedContent();
    }

    showAuthorizedContent() {
        const authorizedContent = document.querySelectorAll('[data-authorized]');
        const unauthorizedContent = document.querySelectorAll('[data-unauthorized]');
        this._hide(unauthorizedContent);
        this._show(authorizedContent);
        this.isAuthorized = true;
        this._changeAuthInElem();
    }

    showUnauthorizedContent() {
        const authorizedContent = document.querySelectorAll('[data-authorized]');
        const unauthorizedContent = document.querySelectorAll('[data-unauthorized]');
        this._hide(authorizedContent);
        this._show(unauthorizedContent);
        this.isAuthorized = false;
        this._changeAuthInElem();
    }

    _hide(content) {
        content.forEach(
            (element) => element.setAttribute('hidden', '')
        );
    }

    _show(content) {
        content.forEach(
            (element) => element.removeAttribute('hidden')
        );
    }

    // Потом удалить, только для теста!!!!
    _createElement() {
        const element = document.createElement('span')
        document.body.append(element);
        element.classList.add('authorization');
        this._style(element, {
            position: 'fixed',
            inset: 'auto 30px 80px auto',
            backgroundColor: 'darkgoldenrod',
            fontSize: '20px',
            color: 'white',
            padding: '5px'
        })
    };

    _style = (node, styles) => Object.keys(styles).forEach(key => node.style[key] = styles[key]);

    _changeAuthInElem() {
        const element = document.querySelector('.authorization');
        element.innerText = `isAuthorized: ${this.isAuthorized}`;
    }
}

export const authorization = new Authorization(false);
