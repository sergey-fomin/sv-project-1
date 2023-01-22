const LOGIN_VALIDATION_RULES = {
    loginEmail: {
        required: {
            value: true,
            message: "Поле 'Email' обязательно для заполнения",
        },
        custom: {
            message: "Введите email в формате 'name@mail.com'",
            fn: (value) => {
                const regExp = /^\S+@\S+\.\S+$/;
                return regExp.test(value);
            },
        },
    },
    loginPassword: {
        minLength: {
            value: 8,
            message: "Минимальная длина поля - {%} символов",
        },
        required: {
            value: true,
            message: "Поле 'Пароль' обязательно для заполнения",
        }
    },
};

export default LOGIN_VALIDATION_RULES;
