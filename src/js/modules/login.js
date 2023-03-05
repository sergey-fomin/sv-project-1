import { showModalWithText } from './modal';
import { router } from './router';
import { api } from './api';
import { authorization } from './authorization';
import { FormManager } from "./form-manager";
import { Validator } from "./validator";

import LOGIN_VALIDATION_RULES from "../data/login-validation-rules";

const headerLoginEmail = document.querySelector('.header__email');

const loadProfileContent = (email) => {
    headerLoginEmail.textContent = email;
    router.open('start-page');
    authorization.showAuthorizedContent();
}

const loginSubmitHandler = (data) => {
    const email = data.loginEmail;

    api.login({
        email: data.loginEmail,
        password: data.loginPassword
    }).then((data) => {
        if (data.success) {
            loadProfileContent(email);
            api.saveToken(data.token);
        } else {
            throw new Error(`User ${email} not found`);
        }
    }).catch((error) => {
        api.removeToken();
        showModalWithText('fail', 'Что-то пошло не так! Попробуйте ещё раз.')
        console.error(error);
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

export { setupLoginFormManager };
