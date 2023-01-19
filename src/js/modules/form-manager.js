export class FormManager {
    constructor({
        initialValuesObj = undefined,
        formSelector,
        inputSelector,
        errorClass,
        submitBtnSelector,
        submitErrorClass,
        validator,
        onSubmit,
    }) {
        this._formElement = document.querySelector(formSelector);
        this._inputElements = this._formElement.querySelectorAll(inputSelector);
        this._errorClass = errorClass;
        this._submitBtn = this._formElement.querySelector(submitBtnSelector); // прокидывать селектор в конструкторе + класс которым дизейблить
        this._submitErrorClass = submitErrorClass;
        this._validator = validator;
        this._onSubmit = onSubmit;
        this._initialValues = initialValuesObj;
        this._currentValuesValidity = {};
        this._onInit();
        this._setupListeners();
    }
    // initial check метод первичной проверки формы, решает дизейблить ли кнопку на старте
    // объект, хранящий состояние формы. ключи - name, значения - isValid
    // forEach текст из инпутов перекинуть в value (editProfileHandler)

    /**
     * Метод при инициализации формы
     */
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

    /**
     * Устанавливаем текущее значение валидности формы
     */
    _setupCurrentValuesValidity() {
        this._inputElements.forEach((input) => {
            this._currentValuesValidity[input.name] = this._validateInput(input).isValid;
        });
    }

    /**
     * Проверяем валидность формы
     * @returns isValid {Boolean}
     */
    _checkFormValidity() {
        return Object.values(this._currentValuesValidity).includes(false)
            ? { isValid: false }
            : { isValid: true };
    }

    /**
     * Обработчик события подтверждения отправки формы
     * @param {Event} evt
     */
    _submitFormHandler = (evt) => {
        if (this._checkFormValidity().isValid) {
            this._onSubmit && this._onSubmit(this._getData());

            console.group("Submitted form data");
            console.table(this._getData());
            console.groupEnd();
        }
    };

    /**
     * Обработчик события ввода значений в поле
     * @param {Event} evt
     */
    _inputEventHandler = (evt) => {
        this._handleInputErrors(evt.target);
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

    /**
     * Валидируем переданный инпут
     * @param inputElement {Element}
     * @returns inputElement, validationResult
     */
    _validateInput(inputElement) {
        const inputName = inputElement.name;
        const inputValue = inputElement.value;
        const validationResult = this._validator.validate(inputName, inputValue);

        return validationResult;
    }

    /**
     * Обрабатываем ошибки валидации в переданном инпуте
     * @param {inputElement}
     */
    _handleInputErrors(inputElement) {
        const errorElement = document.querySelector(`#${inputElement.id} + .form__input-error`);
        const result = this._validateInput(inputElement);
        this._currentValuesValidity[inputElement.name] = result.isValid;

        if (result.isValid) {
            errorElement.textContent = '';
            this._checkFormValidity().isValid && this._submitBtn.classList.remove(this._submitErrorClass);
        } else {
            errorElement.textContent = result.errors[0];
            this._submitBtn.classList.add(this._submitErrorClass);
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
        return data;
    }
}
