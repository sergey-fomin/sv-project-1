import { FormManager } from "./form.manager";
import { Validator } from "./validator";
import { openModalWithContent, closeModal } from "./modal";

import PROFILE_VALIDATION_RULES from "../data/profile-validation-rules";

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileOccupation = profile.querySelector(".profile__occupation");
const editProfileBtn = profile.querySelector(".profile__edit-btn");
const editProfileModalTemplate = document.querySelector("#edit-modal-template").content;

/**
 *  Обработчик подтверждения изменений данных профиля
 * @param {Event} evt
 */
const submitProfileEditHandler = (data) => {
    profileName.innerText = data.name;
    profileOccupation.innerText = data.occupation;
    closeModal();
};

/**
 * Обработчик клика на кнопку редактирования профиля
 */
const editProfileHandler = () => {
    const editProfileModalContent = editProfileModalTemplate.cloneNode(true);
    openModalWithContent(editProfileModalContent);

    new FormManager({
        initialValuesObj: {
            name: profileName.innerText,
            occupation: profileOccupation.innerText,
        },
        formSelector: ".form__edit-profile",
        inputSelector: ".form__input",
        errorClass: "form__input--invalid",
        submitBtnSelector: ".form__submit-btn",
        submitErrorClass: "form__submit-btn--disabled",
        validator: new Validator(PROFILE_VALIDATION_RULES),
        onSubmit: submitProfileEditHandler,
    });
};

/**
 * Слушаем клик на кнопку редактирования профиля
 */
const setupEditProfileBtnListener = () => {
    editProfileBtn.addEventListener("click", editProfileHandler);
};

export { setupEditProfileBtnListener };
