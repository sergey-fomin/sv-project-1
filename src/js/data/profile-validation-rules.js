const DEFAULT_VALIDATION_RULES = {
    name: {
        minLength: {
            value: 3,
            message: "Минимальная длина поля - {%} символа",
        },
        maxLength: {
            value: 30,
            message: "Максимальная длина поля - {%} символов",
        },
        required: {
            value: true,
            message: "Поле 'Имя' обязательно для заполнения",
        },
    },
    occupation: {
        minLength: {
            value: 3,
            message: "Минимальная длина поля - {%} символа",
        },
        maxLength: {
            value: 100,
            message: "Максимальная длина поля - {%} символов",
        },
        required: {
            value: false,
        },
        custom: {
            message: "Custom message",
            // для отладки проверка на четность длины
            fn: (value) => true,
        },
    },
};

export default DEFAULT_VALIDATION_RULES;
