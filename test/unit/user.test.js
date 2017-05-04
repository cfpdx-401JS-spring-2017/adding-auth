const assert = require('chai').assert;
const User = require('../../lib/models/user');

describe('User Model', () => {

  it('generates new hash', () => {
    const user = new User({
      email: 'jenn@starbucks.com'
    });
    const password = 'hunter2';
    user.generateHash(password);

    assert.notEqual(user.hash, password);

    assert.isOk(user.comparePassword('hunter2'));
    assert.isNotOk(user.comparePassword('I made this up'));
  });

});