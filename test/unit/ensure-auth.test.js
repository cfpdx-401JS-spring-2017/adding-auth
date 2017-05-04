const assert = require('chai').assert;
const ensureAuth = require('../../lib/auth/ensure-auth')();
const tokenService = require('../../lib/auth/token-service');

describe('Ensure auth middleware', () => {

  it('routes to error handler when no token found in Authorization Header', done => {
    const req = {
      get() { return ''; }
    };

    const next = (error) => {
      assert.deepEqual(error, { code: 401, error: 'No Authorization Found' });
      done();
    };

    ensureAuth(req, null, next);

  });

  it('routes to error handler when token is bad', done => {
    const req = {
      get() { return 'this-token-sucks'; }
    };

    const next = (error) => {
      assert.deepEqual(error, { code: 401, error: 'Authorization Failed' });
      done();
    };

    ensureAuth(req, null, next);
  });
});