const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('prop API', () => {

    before(db.drop);

    const user = {
        email: 'coolemail@me.com',
        password: 'yipee'
    };

    let token = '';

    before(() => {
        return request.post('/auth/signup')
            .send(user)
            .then(res => token = res.body.token);
    });

    it('returns empty array from get all', () => {
        return request.get('/props')
            .set('Authorization', token)
            .then(res => {
                const props = res.body;
                assert.deepEqual(props, []);
            });
    });

    let poi = {
        name: 'poi',
        number: 2,
        hard: true
    };

    let club = {
        name: 'club',
        number: 3,
        hard: true
    };

    function saveProp(prop) {
        return request
            .post('/props')
            .set('Authorization', token)
            .send(prop)
            .then(res => res.body);
    }

    it('roundtrips a prop', () => {
        return saveProp(poi)
            .then(saved => {
                assert.ok(saved._id);
                poi = saved;
            })
            .then(() => request.get(`/props/${poi._id}`).set('Authorization', token))
            .then(res => res.body)
            .then(got => {
                assert.equal(got._id, poi._id);
            });
    });

    it('returns 404 for nonexistent id', () => {
        const nonId = '589d04a8b6695bbdfd361241';
        return request.get(`/props/${nonId}`)
            .set('Authorization', token)
            .then(
            () => { throw new Error('expected 404'); },
            res => {
                assert.equal(res.status, 404);
            });
    });

    it('gets all props', () => {
        return saveProp(club)
            .then(saved => club = saved)
            .then(() => request.get('/props').set('Authorization', token))
            .then(res => res.body)
            .then(props => {
                assert.equal(props.length, 2);
                assert.include(props, {
                    _id: poi._id,
                    name: poi.name,
                    number: poi.number,
                    hard: poi.hard
                });
                assert.include(props, {
                    _id: club._id,
                    name: club.name,
                    number: club.number,
                    hard: club.hard
                });
            });
    });

    it('returns correct validation error', () => {
        return saveProp({})
            .then(
            () => { throw new Error('expected failure'); },
            () => { }
            );
    });
});