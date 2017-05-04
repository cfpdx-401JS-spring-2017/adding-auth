const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('Auth User Management', () => {

  before(db.drop);

  const user = {
    email: 'PomLover57@gmail.com',
    password: 'hunter2'
  };

  const badRequest = (url, data, code, error) =>
    request.post(url)
      .send(data)
      .then(
      () => { throw new Error('Status should not be OK'); },
      res => {
        assert.equal(res.status, code);
        assert.equal(res.response.body.error, error);
      });

  let token = '';

  describe('Sign Up', () => {

    it('signup happy path', () => {
      return request.post('/api/auth/signup')
        .send(user)
        .then(res => {
          token = res.body.token;
          assert.ok(token = res.body.token);
        });
    });

    it('requires username', () => {
      return badRequest('/api/auth/signup', { password: 'hunter2' }, 400, 'Email and password must be entered.');
    });

    it('requires password', () => {
      return badRequest('/api/auth/signup', { username: 'PomLover57' }, 400, 'Email and password must be entered.');
    });

  });

  describe('Sign In', () => {

    it('signin happy path', () => {
      return request.post('/api/auth/signin')
        .send(user)
        .then(res => assert.ok(res.body.token));
    });

    it('token is valid', () => {
      return request.get('/api/auth/verify')
        .set('Authorization', token)
        .then(res => {
          assert.ok(res.body);
        });
    });

  });
});