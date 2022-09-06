import DEFAULT_VALIDATION_RULES from "../data/validation-rules";

export class FormManager {
    constructor({
        formSelector,
        inputSelector,
        errorClass,
        onSubmit,
        validationRules = DEFAULT_VALIDATION_RULES,
    }) {
        this._formElement = document.querySelector(formSelector);
        this._inputElements =document.querySelectorAll(inputSelector);
        this._validationRules = validationRules;
        // this._validationRules = DEFAULT_VALIDATION_RULES;
        this._errorClass = errorClass;

        this._setupListeners();
    }

    _setupListeners = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            onSubmit && onSubmit(this._getData());
        });

        this._inputElements.forEach(inputElement => {
            inputElement.addEventListener('input', (evt) => {
                this._validateInput(evt.target);
            });
        });
    }

    _validateInput(inputElement) {
        const errorElement = document.querySelector(`#${inputElement.id} + .form__input-error`);
        const inputName = inputElement.name;
        const inputValue = inputElement.value;
        const rules = this._validationRules[inputName]
        let isValid = false;

        if (!rules) {
            return
        }

        if (rules.required && (inputValue.length === 0)) {
            // Required
            inputElement.classList.add(this._errorClass);
            errorElement.textContent = rules.errorMessage.isRequired;
        } else if (rules.minLength && (inputValue.length < rules.minLength)) {
            // Min Length
            inputElement.classList.add(this._errorClass);
            errorElement.textContent = rules.errorMessage.tooShort;
        } else if (rules.minLength && (inputValue.length > rules.maxLength)) {
            // Max Length
            inputElement.classList.add(this._errorClass);
            errorElement.textContent = rules.errorMessage.tooLong;
        } else {
            isValid = true;
        }

        if (isValid) {
            inputElement.classList.remove(this._errorClass);
            errorElement.textContent = '';
        }
    }

    _getData() {
        return 'data';
    }
}
