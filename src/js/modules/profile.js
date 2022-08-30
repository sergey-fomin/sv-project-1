import { openModalWithContent, closeModal } from './modal';

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileOccupation = profile.querySelector('.profile__occupation');
const editProfileBtn = profile.querySelector('.profile__edit-btn');
const editProfileModalTemplate = document.querySelector('#edit-modal-template').content;

/**
 *  Обработчик подтверждения изменений данных профиля
 * @param {Event} evt
 */
const submitProfileEditHandler = (evt) => {
    evt.preventDefault();
    const editProfileName = document.querySelector('#name');
    const editProfileOccupation = document.querySelector('#occupation');
    profileName.innerText = editProfileName.value;
    profileOccupation.innerText = editProfileOccupation.value;
    const submitProfileEditBtn = document.querySelector('.modal__form-submit-btn');
    submitProfileEditBtn.removeEventListener('click', submitProfileEditHandler);
    closeModal();
}

/**
 * Слушаем клик на кнопку подтверждения изменения данных профиля
 */
const submitProfileEditListener = () => {
    const submitProfileEditBtn = document.querySelector('.modal__form-submit-btn');
    submitProfileEditBtn.addEventListener('click', submitProfileEditHandler);
}

/**
 * Обработчик клика на кнопку редактирования профиля
 */
const editProfileHandler = () => {
    const editProfileModalContent = editProfileModalTemplate.cloneNode(true);
    openModalWithContent(editProfileModalContent);
    const editProfileName = document.querySelector('#name');
    const editProfileOccupation = document.querySelector('#occupation');
    editProfileName.value = profileName.innerText;
    editProfileOccupation.value = profileOccupation.innerText;
    submitProfileEditListener();
}

/**
 * Слушаем клик на кнопку редактирования профиля
 */
const editProfileBtnListener = () => {
    editProfileBtn.addEventListener('click', editProfileHandler);
}

export { editProfileBtnListener };
