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

        if (rules.required && value.length === 0) {
            errors.push(rules.required.message);
        }

        if (value.length < rules.minLength?.value) {
            errors.push(
                rules.minLength.message.replace("{%}", rules.minLength.value)
            );
        }

        if (value.length > rules.maxLength?.value) {
            errors.push(
                rules.maxLength.message.replace("{%}", rules.maxLength.value)
            );
        }

        // console.log(errors);

        if (errors.length) {
            return { isValid: false, errors };
        } else {
            return { isValid: true };
        }
    }
}
