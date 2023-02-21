import { showModalWithText } from './modal';
import { router } from './router';
import { api } from './api';
import { FormManager } from "./form-manager";
import { Validator } from "./validator";

import REGISTRATION_VALIDATION_RULES from "../data/registration-validation-rules";

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

const registrationSubmitHandler = (data) => {
    api.register({
        name: data.registrationName,
        description: data.registrationProfileDescription,
        avatar: data.registrationAvatarUrl,
        email: data.registrationEmail,
        password: data.registrationPassword,
    }).then((data) => {
        if (data.success) {
            showModalWithText('success', 'Вы успешно зарегистрировались!')
            router.open('login');
        } else {
            throw new Error(data.error);
        }
    }).catch((error) => {
        console.error(error);
        showModalWithText('fail', 'Что-то пошло не так! Попробуйте ещё раз.')
    });
}

const setupRegistrationLinksListener = () => {
    formLinkToLogin.addEventListener('click', loginLinksHandler);
    headerLinks.forEach((link) => {
        link.addEventListener('click', loginLinksHandler)
    });
}

const setupRegistrationFormManager = () => {
    new FormManager({
        formSelector: ".form--registration",
        inputSelector: ".form__input",
        errorClass: "form__input--invalid",
        submitBtnSelector: ".form__submit-btn",
        submitErrorClass: "form__submit-btn--disabled",
        validator: new Validator(REGISTRATION_VALIDATION_RULES),
        onSubmit: registrationSubmitHandler,
    });
}

export { setupRegistrationLinksListener, setupRegistrationFormManager };
