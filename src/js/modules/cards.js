import { FormManager } from './form-manager';
import { Validator } from "./validator";
import { openModalWithContent, closeModal } from './modal';
import { api } from './api';

import CARD_VALIDATION_RULES from "../data/card-validation-rules";

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card-list__item');
const addCardModalTemplate = document.querySelector('#add-card-modal-template').content;
const imageModalTemplate = document.querySelector('#image-modal-template').content;

/**
 * Открытие модалки с увеличенной картинкой
 * @param {Node} image
 */
const openCardImageModal = (image) => {
    const imageModalContent = imageModalTemplate.cloneNode(true);
    const imageModal = imageModalContent.querySelector('.modal__image');
    imageModal.src = image.src;
    imageModal.srcset = image.srcset;
    imageModal.alt = image.alt;
    openModalWithContent(imageModalContent);
}

/**
 * Обработчик события клика на карточку
 */
const cardsListHandler = (evt) => {
    if (evt.target.matches('.card-item__image')) {
        const clickedImageClone = evt.target.cloneNode(true);
        openCardImageModal(clickedImageClone);
    }
    if (evt.target.matches('.card-item__like-btn')) {
        evt.target.classList.toggle('is-active');
    }
}

/**
 * Устанавливаем обработчик события клика на карточку
 */
const setupCardListListener = () => {
    const cardsList = document.querySelector('.card-list');
    cardsList.addEventListener('click', cardsListHandler);
}

/**
 * Добавление на страницу карточек из массива
 * @param {Array} cards - массив с данными карточек
 * @param {number} cardsAmount - необязательно, количество карточек
 */
const addCardsFromArray = (cards, cardsAmount = undefined) => {
    setupCardListListener();

    if (!cardsAmount) {
        cardsAmount = cards.length;
    }

    const cardsListFragment = document.createDocumentFragment();
    const cardsList = document.querySelector('.card-list');

    for (let i = 0; i < cardsAmount; i++) {
        const card = cards[i];
        const cardElement = cardTemplate.cloneNode(true);
        const cardTitle = cardElement.querySelector('.card-item__title');
        const cardImage = cardElement.querySelector('.card-item__image');
        cardTitle.innerText = card.title || '';
        cardImage.src = card.url || '';
        cardImage.alt = card.title || '';

        cardsListFragment.appendChild(cardElement);
    }

    cardsList.appendChild(cardsListFragment);
}

/**
 * Добавляет карточку нового места на страницу
 * @param {string} title
 * @param {string} url
 */
const addCard = (title, url) => {
    const cardsList = document.querySelector('.card-list');
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card-item__image');

    cardElement.querySelector('.card-item__title').innerText = title;
    cardImage.src = url;
    cardImage.srcset = '';
    cardImage.alt = title;

    cardsList.appendChild(cardElement);
}
/**
 * Обработчик клика на кнопку подтверждения формы создания карточки
*/
const submitCardAddingHandler = (data) => {
    addCard(data.placeTitle, data.imageUrl);
    closeModal();
}

/**
 * Обработчик события клика на кнопку открытия модалки добавления новой карточки
 */
const addCardHandler = () => {
    const addCardModalContent = addCardModalTemplate.cloneNode(true);
    openModalWithContent(addCardModalContent);

    new FormManager({
        formSelector: ".form--add-card",
        inputSelector: ".form__input",
        errorClass: "form__input--invalid",
        submitBtnSelector: ".form__submit-btn",
        submitErrorClass: "form__submit-btn--disabled",
        validator: new Validator(CARD_VALIDATION_RULES),
        onSubmit: submitCardAddingHandler,
    });
}

/**
 * Слушаем клик на кнопку открытия модалки добавления новой карточки
 */
const setupAddCardListener = () => {
    const addCardBtn = document.querySelector('.profile__add-card-btn');
    addCardBtn.addEventListener('click', addCardHandler);
}

function loadCardsFromServer() {
    api.getCards()
        .then((cards) => addCardsFromArray(cards))
        .then(setupAddCardListener);
}

export { loadCardsFromServer };
