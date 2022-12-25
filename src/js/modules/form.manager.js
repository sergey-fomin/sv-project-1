export class FormManager {
    constructor({
        initialValuesObj = undefined,
        formSelector,
        inputSelector,
        errorClass,
        submitBtnSelector,
        submitErrorClass,
        validator,
        custom = undefined,
        onSubmit,
    }) {
        this._formElement = document.querySelector(formSelector);
        this._inputElements = this._formElement.querySelectorAll(inputSelector);
        this._errorClass = errorClass;
        this._submitBtn = this._formElement.querySelector(submitBtnSelector); // прокидывать селектор в конструкторе + класс которым дизейблить
        // this._validationRules = validationRules;
        this._submitErrorClass = submitErrorClass;
        this._validator = validator;
        this._onSubmit = onSubmit;
        this._initialValues = initialValuesObj;
        this._currentValuesValidity = {};

        // this._setupInitialValues();
        this._onInit();
        this._setupListeners();
    }
    // initial check метод первичной проверки формы, решает дизейблить ли кнопку на старте
    // объект, хранящий состояние формы. ключи - name, значения - isValid
    // forEach текст из инпутов перекинуть в value (editProfileHandler)
    _onInit() {
        this._setupInitialValues();
        this._setupCurrentValuesValidity();
        if (!this._checkFormValidity().isValid) {
            this._submitBtn.classList.add(this._submitErrorClass);
        }
    }

    /**
     * Устанавливаем начальные значения в инпуты, если они переданы в конструктор
     */
    _setupInitialValues() {
        // взять объект initialValues
        // взять каждый инпут
        // взять его name
        // есть ли этот name в ключах initial val
        // если да, значение положить в input.value
        if (!this._initialValues) {
            return;
        }
        this._inputElements.forEach((input) => {
            if (this._initialValues.hasOwnProperty(input.name)) {
                input.value = this._initialValues[input.name];
            }
        });
    }

    _setupCurrentValuesValidity() {
        console.log(this._currentValuesValidity);
        this._inputElements.forEach((elem) => {
            this._currentValuesValidity[elem.name] = this._validateInput(elem).validationResult;
            console.log(this._currentValuesValidity);
        });
    }

    _checkFormValidity() {
        for (let input in this._currentValuesValidity) {
            if (!input.isValid) {
                return { isValid: false };
            }
        }

        return { isValid: true };
    }

    /**
     * Обработчик события подтверждения отправки формы
     * @param {Event} evt
     */
    _submitFormHandler = (evt) => {
        evt.preventDefault();
        console.log("submit");
        if (this._checkFormValidity().isValid) {
            this._onSubmit && this._onSubmit(this._getData());
        }
    };

    /**
     * Обработчик события ввода значений в поле
     * @param {Event} evt
     */
    _inputEventHandler = (evt) => {
        this._handleInputErrors(this._validateInput(evt.target));
        this._getData();
    };

    /**
     * Слушаем события ввода значений и подтверждения отправки формы
     */
    _setupListeners = () => {
        this._formElement.addEventListener("submit", this._submitFormHandler);

        this._inputElements.forEach((inputElement) => {
            inputElement.addEventListener("input", this._inputEventHandler);
        });
    };

    _validateInput(inputElement) {
        const inputName = inputElement.name;
        const inputValue = inputElement.value;
        const validationResult = this._validator.validate(inputName, inputValue);

        return { inputElement, validationResult };
    }

    _handleInputErrors({inputElement, validationResult}) {
        const errorElement = document.querySelector(`#${inputElement.id} + .form__input-error`);

        if (validationResult.isValid) {
            errorElement.textContent = '';
        } else {
            errorElement.textContent = validationResult.errors[0];
        }

    }

    /**
     * Собираем данные формы для отправки
     * @returns data
     */
    _getData() {
        let data = {};

        this._inputElements.forEach((elem) => {
            data[elem.name] = elem.value;
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
