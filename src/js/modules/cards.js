import { openModalWithContent, closeModal } from './modal';

const cardsList = document.querySelector('.card-list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card-list__item');
const addCardBtn = document.querySelector('.profile__add-card-btn');
const addCardModalTemplate = document.querySelector('#add-card-modal-template').content;
const imageModalTemplate = document.querySelector('#image-modal-template').content;

/**
 * Получить рандомное число в заданном диапазоне
 * @param {number} min
 * @param {number} max
 * @returns
 */
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
 * Колбэк обработчика события клика на карточку
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
 * Обработчик события клика на карточку
 */
const cardListListener = () => {
    cardsList.addEventListener('click', cardsListHandler);
}

/**
 * Добавление на страницу карточек из массива
 * @param {Array} cards - массив с данными карточек
 * @param {number} cardsAmount - количество карточек
 */
const addCardsFromArray = (cards, cardsAmount) => {
    cardListListener();
    const cardsListFragment = document.createDocumentFragment();

    for (let i = 0; i < cardsAmount; i++) {
        const randomIdx = getRandomInt(0, cards.length - 1);
        const randomCard = cards[randomIdx];
        const cardElement = cardTemplate.cloneNode(true);
        const cardImage = cardElement.querySelector('.card-item__image');
        cardElement.querySelector('.card-item__title').innerText = randomCard.title || '';
        cardElement.querySelector('source').srcset = randomCard.sourceSrcSet || '';
        cardImage.src = randomCard.imgSrc || '';
        cardImage.srcset = randomCard.imgSrcSet || '';
        cardImage.alt = randomCard.imgAlt || '';

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
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card-item__image');

    cardElement.querySelector('.card-item__title').innerText = title;
    cardImage.src = url;
    cardImage.srcset = '';
    cardImage.alt = title;

    cardsList.appendChild(cardElement);
}
/**
 * Колбэк обработчика клика на кнопку подтверждения формы создания карточки
*/
const submitCardAddingHandler = (evt) => {
    evt.preventDefault();
    const newCardTitle = document.querySelector('#place-title');
    const newCardUrl = document.querySelector('#image-url');
    addCard(newCardTitle.value, newCardUrl.value);
    const submitCardAddingBtn = document.querySelector('.modal__form-submit-btn');
    submitCardAddingBtn.removeEventListener('click', submitCardAddingHandler);
    closeModal();
}

/**
 * Обработчик клика на кнопку подтверждения формы создания карточки
 */
const submitCardAddingListener = () => {
    const submitCardAddingBtn = document.querySelector('.modal__form-submit-btn');
    submitCardAddingBtn.addEventListener('click', submitCardAddingHandler);
}

/**
 * Колбэк обработчика события клика на кнопку открытия модалки добавления новой карточки
 */
const addCardHandler = () => {
    const addCardModalContent = addCardModalTemplate.cloneNode(true);
    openModalWithContent(addCardModalContent);
    submitCardAddingListener();
}

/**
 * Обработчик события клика на кнопку открытия модалки добавления новой карточки
 */
const addCardListener = () => {
    addCardBtn.addEventListener('click', addCardHandler);
}

export { addCardsFromArray, addCardListener };
