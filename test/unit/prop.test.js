const assert = require('chai').assert;
const Prop = require('../../lib/models/prop');

const expectedValidation = () => { throw new Error('expected validation error'); };

describe('prop validations', () => {

    it('validates prop name', () => {
        const testProp = new Prop({
            name: 'poi',
        });
        return testProp.validate();
    });
});

describe('validation failures', () => {

    it('checks that required fields are required', () => {
        const prop = new Prop();
        prop.validate()
            .then(expectedValidation,
            err => {
                const errors = err.errors;
                assert.ok(errors.name && errors.name.kind === 'required');
            });
    });
});