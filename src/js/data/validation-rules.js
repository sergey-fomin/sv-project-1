const DEFAULT_VALIDATION_RULES = {
    name: {
        minLength: 3,
        maxLength: 30,
        required: true,
        errorMessage: {
            tooShort: `Минимальная длина поля - 3 символа`,
            tooLong: `Максимальная длина поля - 30 символов`,
            isRequired: `Поле "Имя" обязательно для заполнения`,
        }
    },
    occupation: {
        minLength: 3,
        maxLength: 100,
        required: false,
        errorMessage: {
            tooShort: `Минимальная длина поля - 3 символа`,
            tooLong: `Максимальная длина поля - 100 символов`, // сделать динамическим в зависимости от мин/макс символов
        }
    },
    placeTitle: {

    },
    imageUrl: {

    }
};

export default DEFAULT_VALIDATION_RULES;
