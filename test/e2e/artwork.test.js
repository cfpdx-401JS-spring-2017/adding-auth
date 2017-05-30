const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('artwork API', () => {

  before(db.drop);

  let token = '';

  const user = {
    email: 'user',
    password: 'abc'
  };

  it('signs up test user', () => {
    return request.post('/auth/signup')
        .send(user)
        .then(res => {
          token = res.body.token;

          assert.ok(token);
        });
  });

  it('signs in a user', () => {
    return request.post('/auth/signin')
      .set('Authorization', token)
      .send(user);
  });

  it('initial GET should return empty array', () => {
    return request.get('/artworks')
      .set('Authorization', token)
      .then(res => res.body)
      .then(art => assert.deepEqual(art, []));
  });

  let nude = { name: 'Nude Descending A Staircase', artist: 'Duchamp', medium: 'oil' };

  it('POST should add a document', () => {
    return request.post('/artworks')
      .set('Authorization', token)
      .send(nude)
      .then(res => res.body)
      .then(saved => {
        assert.ok(saved._id);

        nude = saved;
      });
  });

  it('GET by id should return document', () => {
    return request.get(`/artworks/${nude._id}`)
      .set('Authorization', token)
      .then(res => res.body)
      .then(got => assert.deepEqual(got, nude));
  });

});