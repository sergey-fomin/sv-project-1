import { FormManager } from "./form.manager";
import { Validator } from "./validator";
import { openModalWithContent, closeModal } from "./modal";

import DEFAULT_VALIDATION_RULES from "../data/default-validation-rules";

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileOccupation = profile.querySelector(".profile__occupation");
const editProfileBtn = profile.querySelector(".profile__edit-btn");
const editProfileModalTemplate = document.querySelector(
    "#edit-modal-template"
).content;

/**
 *  Обработчик подтверждения изменений данных профиля
 * @param {Event} evt
 */
const submitProfileEditHandler = (evt) => {
    evt.preventDefault();
    const editProfileName = document.querySelector("#name");
    const editProfileOccupation = document.querySelector("#occupation");
    const submitProfileEditBtn = document.querySelector(".form__submit-btn");
    profileName.innerText = editProfileName.value;
    profileOccupation.innerText = editProfileOccupation.value;
    submitProfileEditBtn.removeEventListener("click", submitProfileEditHandler);
    closeModal();
};

/**
 * Слушаем клик на кнопку подтверждения изменения данных профиля
 */
const setupSubmitProfileEditListener = () => {
    const submitProfileEditBtn = document.querySelector(".form__submit-btn");
    submitProfileEditBtn.addEventListener("click", submitProfileEditHandler);
};

/**
 * Обработчик клика на кнопку редактирования профиля
 */
const editProfileHandler = () => {
    const editProfileModalContent = editProfileModalTemplate.cloneNode(true);
    openModalWithContent(editProfileModalContent);
    const editProfileName = document.querySelector("#name");
    const editProfileOccupation = document.querySelector("#occupation");
    editProfileName.value = profileName.innerText;
    editProfileOccupation.value = profileOccupation.innerText;

    const profileEditFormValidator = new Validator(DEFAULT_VALIDATION_RULES);
    new FormManager({
        formSelector: ".form",
        inputSelector: ".form__input",
        errorClass: "form__input--invalid",
        onSubmit: function (data) {
            console.log(data);
        },
    });
    setupSubmitProfileEditListener();
};

/**
 * Слушаем клик на кнопку редактирования профиля
 */
const setupEditProfileBtnListener = () => {
    editProfileBtn.addEventListener("click", editProfileHandler);
};

export { setupEditProfileBtnListener };
