const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('auth tests', () => {

    before(db.drop);

    const user = { 
        email: 'coolemail@me.com', 
        password: 'yipee' 
    };

    describe('user management', () => {

        const badRequest = (url, data, code, error) => {
            return request
                .post(url)
                .send(data)
                .then(
                () => { throw new Error('status should be not ok'); },
                res => {
                    assert.equal(res.status, code);
                    assert.equal(res.response.body.error, error);
                });
        };

        it('signup requires email', () => {
            badRequest('/auth/signup', { password: 'yipee' }, 400, 'username and password are required');
        });

        it('signup requires password', () => {
            badRequest('/auth/signup', { email: 'coolemail@me.com' }, 400, 'username and password are required');
        });

        it('signup happy path', () => {
            return request
                .post('/auth/signup')
                .send(user)
                .then(res => assert.ok(res.body.token));
        });

        it('can\'t use same username', () => {
            badRequest('/auth/signin', user, 400, 'username taken');
        });
    });

});