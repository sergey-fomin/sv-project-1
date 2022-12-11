export class Validator {
    constructor(rules) {
        this._rules = rules;
    }

    validate(name, value) {
        const rules = this._rules[name];

        if (!rules) {
            return { isValid: true };
        }

        const errors = [];

        if (value.length < rules.minLength?.value) {
            errors.push({
                isValid: false,
                message: rules.minLength.message.replace(
                    "{%}",
                    rules.minLength.value
                ),
            });
        }

        if (rules.maxLength?.value > value.length) {
            errors.push({
                isValid: false,
                message: rules.maxLength.message.replace(
                    "{%}",
                    rules.maxLength.value
                ),
            });
        }

        if (rules.required && value.length === 0) {
            errors.push({
                isValid: false,
                message: rules.required.message,
            });
        }

        if (errors.length) {
            return { isValid: false, errors };
        } else {
            return { isValid: true };
        }
    }
}
