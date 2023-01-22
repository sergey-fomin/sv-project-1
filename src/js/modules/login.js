import { openModalWithContent, closeModal } from './modal';
import { Router } from './router';
import { FormManager } from "./form-manager";
import { Validator } from "./validator";

import LOGIN_VALIDATION_RULES from "../data/login-validation-rules";

const form = document.querySelector('.main__login-form');
const title = form.querySelector('.form__title');
const submitBtn = form.querySelector('.form__submit-btn');
const formLoginLink = document.querySelector('.main__login-form-link');
const header = document.querySelector('.header');
const headerLoginLink = header.querySelector('.header__login-link');
const headerLoginEmail = header.querySelector('.header__email');

const router = new Router('registration');

const loadProfileContent = () => {
    headerLoginLink.textContent = 'Выйти';
    headerLoginEmail.textContent = 'email@mail.com';
    router.open('start-page');
}

const toggleLoginData = () => {
    if (header.classList.contains('header--logged-in')) {
        router.open('registration');
        header.classList.remove('header--logged-in');
        return;
    }

    if (form.classList.contains('main__login-form--registration')) {
        headerLoginLink.textContent = 'Регистрация';
        title.textContent = 'Вход';
        submitBtn.textContent = 'Войти';
    } else {
        headerLoginLink.textContent = 'Войти';
        title.textContent = 'Регистрация';
        submitBtn.textContent = 'Зарегистрироваться';
    }

    form.classList.toggle('main__login-form--registration');
}

const loginLinksHandler = (evt) => {
    evt.preventDefault();
    toggleLoginData();
}

const loginSubmitHandler = (data) => {
    const loginMessageContent = document.querySelector('#login-message-template').content.cloneNode(true);
    openModalWithContent(loginMessageContent);
    const loginMessageImg = document.querySelector('.login-message__icon');
    const loginMessageText = document.querySelector('.login-message__text');

    if (form.classList.contains('main__login-form--registration')) {
        loginMessageImg.src = require('../../assets/svg/success-icon.svg');
        loginMessageImg.alt = 'success-icon';
        loginMessageText.innerText = 'Вы успешно зарегистрировались!';
        header.classList.add('header--logged-in');
        setTimeout(() => {
            closeModal();
            loadProfileContent();
        }, 1500);
    } else {
        loginMessageImg.src = require('../../assets/svg/fail-icon.svg');
        loginMessageImg.alt = 'fail-icon';
        loginMessageText.innerText = 'Что-то пошло не так! Попробуйте ещё раз.';
    }

}

const setupLoginLinksListener = () => {
    formLoginLink.addEventListener('click', loginLinksHandler);
    headerLoginLink.addEventListener('click', loginLinksHandler);
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
