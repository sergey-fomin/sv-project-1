import { openModalWithContent, closeModal } from './modal';
import { router } from './router';
import { api } from './api';
import { FormManager } from "./form-manager";
import { Validator } from "./validator";

import LOGIN_VALIDATION_RULES from "../data/login-validation-rules";

const formLinkToLogin = document.querySelector('.main__form-link');
const headerLinks = document.querySelectorAll('.header__link');
const headerLoginEmail = document.querySelector('.header__email');
const loginMessageContent = document.querySelector('#login-message-template').content.cloneNode(true);


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

function showFailModal() {
    openModalWithContent(loginMessageContent);
    const loginMessageImg = document.querySelector('.login-message__icon');
    const loginMessageText = document.querySelector('.login-message__text');
    loginMessageImg.src = require('../../assets/svg/fail-icon.svg');
    loginMessageImg.alt = 'fail-icon';
    loginMessageText.innerText = 'Что-то пошло не так! Попробуйте ещё раз.';
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
        showFailModal();
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
