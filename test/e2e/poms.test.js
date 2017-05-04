const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('Poms API', () => {

  before(db.drop);

  let token = '';

  //create a token!
  before(() => {
    return request.post('/api/auth/signup')
      .send({ email: 'keeley@thedrawplay.com', password: 'banana' })
      .then(res => {
        token = res.body.token;
      });
  });

  it('GET/ pom with token', () => {
    let pom = {
      name: 'Brownie',
      color: 'black',
      weight: 20,
      bestPom: true
    };

    return request.post('/api/poms')
      .send(pom)
      .then(res => {
        pom = res.body;
        return request.get(`/api/poms/${pom._id}`)
          .set('Authorization', token);
      })
      .then(res => {
        const fetched = res.body;

        assert.deepEqual(fetched, {});
      })
      .catch(err => { throw err; });
  });

});