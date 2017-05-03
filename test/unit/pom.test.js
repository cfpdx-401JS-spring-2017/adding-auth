const assert = require('chai').assert;
const Pom = require('../../lib/models/pom');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('Pom Model', () => {

  it('happy path', () => {
    const ginger = new Pom({
      name: 'Ginger',
      color: 'red',
      weight: 15,
      bestPom: true
    });

    return ginger.validate();
  });

  it('name is required', () => {
    const cat = new Pom({});

    return cat.validate()
    .then(expectedValidation, 
    err => {
      const errors = err.errors;
      assert.ok(errors.name && errors.name.kind === 'required');
    });
    
  });

});