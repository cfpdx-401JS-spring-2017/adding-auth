const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('Auth User Management', () => {

  before(db.drop);

  const user = {
    username: 'PomLover57',
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
    }
  );

  describe('Sign Up', () => {

    it('requires username', () => {
      badRequest('/auth/signup', { password: 'hunter2' }, 400, 'username and password required');
    });

  });

  describe('Sign In', () => {
    
  });
});