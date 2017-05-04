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
            badRequest('/auth/signup', { password: 'yipee' }, 400, 'email and password are required');
        });

        it('signup requires password', () => {
            badRequest('/auth/signup', { email: 'coolemail@me.com' }, 400, 'email and password are required');
        });

        it('signup happy path', () => {
            return request
                .post('/auth/signup')
                .send(user)
                .then(res => assert.ok(res.body.token));
        });

        it('can\'t use same email', () => {
            badRequest('/auth/signup', user, 400, 'email taken');
        });

        it('signin requires password', () => {
            badRequest('/auth/signin', { email: 'yee@yee.com' }, 400, 'email and password are required');
        });

        it('signin requires email', () => {
            badRequest('/auth/signin', { password: 'yee' }, 400, 'email and password are required');
        });

        it('signin with wrong email', () => {
            badRequest('/auth/signin', { email: 'notanemail', password: user.password }, 401, 'invalid email or password');
        });

        it('signin with wrong password', () => {
            badRequest('/auth/signin', { email: user.email, password: 'nope'  }, 401, 'invalid email or password');
        });

        
    });

});