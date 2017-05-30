const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('auth', () => {

  before(db.drop);

  const user = {
    email: 'user',
    password: 'abc'
  };

  describe('user management', () => {
    
    const badRequest = (url, data, code, error) => {
      return request
        .post(url)
        .send(data)
        .then(
          () => { throw new Error('status should not be ok'); },
          res => {
            assert.equal(res.status, code);
            assert.equal(res.response.body.error, error);
          }
        );
    };

    it('signup requires username', () => {
      return badRequest('/auth/signup', { password: 'abc' }, 401, 'email and password must be supplied');
    });

    it('signup requires password', () => {
      return badRequest('/auth/signup', { username: 'user' }, 401, 'email and password must be supplied');
    });

    let token = '';

    it('signup', () => {
      request
        .post('/auth/signup')
        .send(user)
        .then(res => {
          token = res.body.token;

          assert.ok(token);
        });
    });

    it('throws error if username already in use', () => {
      badRequest('/auth/signup', user, 400, 'email in use');
    });

  });

});