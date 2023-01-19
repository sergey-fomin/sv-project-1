const CARD_VALIDATION_RULES = {
    placeTitle: {
        minLength: {
            value: 3,
            message: "Минимальная длина поля - {%} символа",
        },
        maxLength: {
            value: 50,
            message: "Максимальная длина поля - {%} символов",
        },
        required: {
            value: true,
            message: "Поле 'Название места' обязательно для заполнения",
        },
    },
    imageUrl: {
        required: {
            value: true,
            message: "Поле 'URL изображения' обязательно для заполнения",
        },
        custom: {
            message: "Введите URL изображения в формате 'http://site.ru/path-to-file'",
            fn: (value) => {
                const regExp = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
                return regExp.test(value);
            },
        },
    },
};

export default CARD_VALIDATION_RULES;
