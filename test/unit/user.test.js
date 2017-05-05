const assert = require('chai').assert;
const User = require('../../lib/models/user');

describe('user model', () => {

    it('checks that new user generates hash', () => {
        const user = new User({
            email: 'coolemail@me.com'
        });
        const password = 'yipee';
        user.generateHash(password);

        assert.notEqual(user.hash, password);

        assert.isOk(user.comparePassword('yipee'));
        assert.isNotOk(user.comparePassword('bad password'));
    });
    
});
