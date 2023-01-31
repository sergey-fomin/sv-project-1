const REGISTRATION_VALIDATION_RULES = {
    registrationName: {
        required: {
            value: true,
            message: "Поле 'Имя' обязательно для заполнения",
        },
        minLength: {
            value: 3,
            message: "Минимальная длина поля - {%} символов",
        },
    },
    registrationAvatarUrl: {
        required: {
            value: true,
            message: "Поле 'Аватар' обязательно для заполнения",
        },
        custom: {
            message: "Введите url аватара в формате 'http://path-to-my-awesome/avatar.jpg'",
            fn: (value) => {
                const regExp = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
                return regExp.test(value);
            },
        },
    },
    registrationEmail: {
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
    registrationPassword: {
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

export default REGISTRATION_VALIDATION_RULES;
