// import DEFAULT_VALIDATION_RULES from "../data/validation-rules";

export class FormManager {
    constructor({
        formSelector,
        inputSelector,
        errorClass,
        onSubmit,
        validationRules,
        custom,
        validator,
    }) {
        this._formElement = document.querySelector(formSelector);
        this._inputElements = document.querySelectorAll(inputSelector);
        this._submitBtn = this._formElement.querySelector(
            'button[type="submit"]'
        );
        this._validationRules = validationRules;
        this._errorClass = errorClass;
        this._validator = validator;

        this._setupListeners();
    }

    _setupListeners = () => {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            console.log("submit");
            // onSubmit && onSubmit(this._getData());
            this._getData();
        });

        this._inputElements.forEach((inputElement) => {
            inputElement.addEventListener("input", (evt) => {
                this._validateInput(evt.target);
                console.log(this._inputElements);
                this._getData();
            });
        });
    };

    _validateInput(inputElement) {
        const errorElement = document.querySelector(
            `#${inputElement.id} + .form__input-error`
        );
        const inputName = inputElement.name;
        const inputValue = inputElement.value;

        const validationResult = this._validator.validate(
            inputName,
            inputValue
        );

        if (validationResult.isValid) {
        } else {
            errorElement.textContent = validationResult.errors[0].message;
        }
    }

    _getData() {
        let data = {};

        this._inputElements.forEach((elem) => {
            data[`${elem.name}`] = elem.value;
        });
        console.log(data);
        return data;
    }
}

// В FormManager добавить в конфиг ключ onValidity
// Это функция, в которую фора будет кидать true/false

// new FormManager({
//   onValidity: function(isValid) { if(isValid) { разблокировать кнопку } else { заблокировать кнопку } }
// })
