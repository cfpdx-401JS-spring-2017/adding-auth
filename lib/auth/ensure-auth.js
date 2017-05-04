const tokenService = require('./token-service');

module.exports = function getEnsureAuth() {

    return function ensureAuth(req, res, next) {
        console.log('in ensure auth');
        const token = req.get('Authorization');
        if (!token) return next({ code: 401, error: 'no authorization found' });
        console.log('before we verify');

        tokenService.verify(token)
            .then(payload => {
                console.log('wtf');
                req.user = payload;
                next();
            }, () => {
                next({ code: 401, error: 'no authorization found' });
            })
            .catch(err => {
                console.log('unexpected next() failure', err);
            });
    };
};