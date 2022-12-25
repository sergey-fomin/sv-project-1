
// import DEFAULT_CARDS from "../data/default-cards";
// import { addCardsFromArray, setupAddCardListener } from "./cards";
// import { setupEditProfileBtnListener } from "./profile";
import { openModalWithContent, closeModal } from './modal';


// const contentTemplate = document.querySelector("#authorized-content-template").content.cloneNode(true);
// const contentContainer = document.querySelector('.main__container');

const form = document.querySelector('.main__login-form');
const title = form.querySelector('.form__title');
const login = form.querySelector('#login-email');
const password = form.querySelector('#login-password');
const submitBtn = form.querySelector('.form__submit-btn');
const formLoginLink = document.querySelector('.main__login-form-link');
const headerLoginLink = document.querySelector('.header__login-link');
const headerLoginEmail = document.querySelector('.header__email');



const loadProfileContent = () => {
    const pageContent = document.querySelector('.main__content');
    const loginForm = document.querySelector('.main__login-form-wrapper');

    headerLoginLink.textContent = 'Выйти';
    headerLoginEmail.textContent = 'email@mail.com';
    loginForm.classList.toggle('main__login-form-wrapper--is-hidden');
    pageContent.classList.toggle('main__content--is-hidden');

    // console.log(contentTemplate);
    // contentContainer.appendChild(contentTemplate);
    // addCardsFromArray(DEFAULT_CARDS, 6);
    // setupAddCardListener();
    // setupEditProfileBtnListener();
}

const toggleLoginData = () => {
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
    console.log(evt);
    evt.preventDefault();
    toggleLoginData();
}

const loginSubmitHandler = (evt) => {
    evt.preventDefault();
    const loginMessageContent = document.querySelector('#login-message-template').content.cloneNode(true);
    openModalWithContent(loginMessageContent);
    const loginMessageImg = document.querySelector('.login-message__icon');
    console.log(loginMessageImg);
    const loginMessageText = document.querySelector('.login-message__text');

    if (form.classList.contains('main__login-form--registration')) {
        loginMessageImg.src = '../../assets/svg/success-icon.svg';
        loginMessageImg.alt = 'success-icon';
        loginMessageText.innerText = 'Вы успешно зарегистрировались!';
        setTimeout(() => {
            closeModal();
            loadProfileContent();
        }, 2000);
    } else {
        loginMessageImg.src = '../../assets/svg/fail-icon.svg';
        loginMessageImg.alt = 'fail-icon';
        loginMessageText.innerText = 'Что-то пошло не так! Попробуйте ещё раз.';
    }

}

const setupLoginLinksListener = () => {
    formLoginLink.addEventListener('click', loginLinksHandler);
    headerLoginLink.addEventListener('click', loginLinksHandler);
}

const setupLoginSubmitListenter = () => {
    submitBtn.addEventListener('click', loginSubmitHandler);
}

export { setupLoginLinksListener, setupLoginSubmitListenter };
