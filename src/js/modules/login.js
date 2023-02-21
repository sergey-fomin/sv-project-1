import { showModalWithText } from './modal';
import { router } from './router';
import { api } from './api';
import { FormManager } from "./form-manager";
import { Validator } from "./validator";

import LOGIN_VALIDATION_RULES from "../data/login-validation-rules";

const formLinkToLogin = document.querySelector('.main__form-link');
const headerLinks = document.querySelectorAll('.header__link');
const headerLoginEmail = document.querySelector('.header__email');


const loadProfileContent = () => {
    headerLoginEmail.textContent = 'email@mail.com';
    router.open('start-page');
}

const loginLinksHandler = (evt) => {
    evt.preventDefault();

    switch(router.currentRoute) {
        case 'registration':
            router.open('login');
            break;
        default:
            router.open('registration');
            break;
    }
}

const loginSubmitHandler = (data) => {

    console.log(data);
    api.login({
        email: data.loginEmail,
        password: data.loginPassword
    }).then((data) => {
        if (data.success) {
            localStorage.setItem('token', data.token);
            router.open('start-page');
        } else {
            throw new Error('User not found');
        }
    }).catch((error) => {
        localStorage.removeItem('token');
        showModalWithText('fail', 'Что-то пошло не так! Попробуйте ещё раз.')
        console.error(error);
    });
}

const setupLoginLinksListener = () => {
    formLinkToLogin.addEventListener('click', loginLinksHandler);
    headerLinks.forEach((link) => {
        link.addEventListener('click', loginLinksHandler)
    });
}

const setupLoginFormManager = () => {
    new FormManager({
        formSelector: ".form--login",
        inputSelector: ".form__input",
        errorClass: "form__input--invalid",
        submitBtnSelector: ".form__submit-btn",
        submitErrorClass: "form__submit-btn--disabled",
        validator: new Validator(LOGIN_VALIDATION_RULES),
        onSubmit: loginSubmitHandler,
    });
}

export { setupLoginLinksListener, setupLoginFormManager };
