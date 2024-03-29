const modalTemplate = document.querySelector('#modal-template').content.querySelector('.modal');
const modalMessageContent = document.querySelector('#modal-message-template').content.cloneNode(true);

/**
 * Проверка нажатой клавиши
 * @param {Event} evt
 * @returns
 */
const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

/**
 * Закрывает модальное окно
 */
const closeModal = () => {
    const modal = document.querySelector('.modal');
    modal.remove();
}

/**
 * Обработчик события клика на кнопку закрытия / нажатия клавиши Esc
 * @param {Event} evt
 */
const closeModalHandler = (evt) => {
    if (isEscKey(evt) || evt.type === 'click') {
        closeModal();
        document.removeEventListener('keydown', closeModalHandler);
    }
}

/**
 * Слушаем клик на кнопку закрытия / нажатия клавиши Esc
 * @param {Element} closeBtn
 */
const setupCloseModalListener = (closeBtn) => {
    document.addEventListener('keydown', closeModalHandler);
    closeBtn.addEventListener('click', closeModalHandler);
};

/**
 * Создает модалку с нужным контентом
 * @param {Node} content
 */
const openModalWithContent = (content) => {
    const modalElement = modalTemplate.cloneNode(true);
    const modalContainerElement = modalElement.querySelector('#modal-content-wrapper');
    const modalCloseBtn = modalElement.querySelector('.modal__close-btn');
    modalContainerElement.prepend(content);
    document.body.appendChild(modalElement);
    setupCloseModalListener(modalCloseBtn);
}

/**
 * Показать модалку успеха/провала с текстом
 * @param type {'success' | 'fail'} тип модалки
 * @param text {string} строка с текстом
 */
function showModalWithText(type, text) {
    openModalWithContent(modalMessageContent);
    const messageImg = document.querySelector('.login-message__icon');
    const messageText = document.querySelector('.login-message__text');
    messageImg.src = require(`../../assets/svg/${type}-icon.svg`);
    messageImg.alt = `${type}-icon`;
    messageText.innerText = text;
}

export { openModalWithContent, closeModal, showModalWithText };
