const modalTemplate = document.querySelector('#modal-template').content.querySelector('.modal');

/**
 * Проверка нажатой клавиши
 * @param {Event} evt
 * @returns
 */
const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

/**
 * Колбэк обработчика события клика на кнопку закрытия / нажатия клавиши Esc
 * @param {Event} evt
 */
const closeModalHandler = (evt) => {
    const modal = document.querySelector('.modal');
    if (isEscKey(evt) || evt.type === 'click') {
        modal.remove();
        document.removeEventListener('keydown', closeModalHandler);
    }
}

/**
 * Обработчик события клика на кнопку закрытия / нажатия клавиши Esc
 * @param {Element} closeBtn
 */
const closeModalListener = (closeBtn) => {
    document.addEventListener('keydown', closeModalHandler);
    closeBtn.addEventListener('click', closeModalHandler);
};

const openModalWithContent = (content) => {
    const modalElement = modalTemplate.cloneNode(true);
    const modalContainerElement = modalElement.querySelector('#modal-container');
    const modalCloseBtn = modalElement.querySelector('modal__close-btn');
    modalContainerElement.prepend(content);
    document.body.appendChild(modalElement);
    closeModalListener(modalCloseBtn);
}

export { openModalWithContent };
