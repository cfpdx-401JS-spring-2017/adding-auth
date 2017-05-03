const Router = require('express').Router;
const router = Router();

const User = require('..models/user');
const ensureAuth = require('../auth/ensure-auth');
const tokenService = require('../auth/token-service');

function hasEmailPassword(req, res, next) {
  const user = req.body;
  if(!user.email || !user.password) {
    return next({
      code: 400,
      error: 'Email and password must be entered.'
    });
  }
  next();
}

router.get('/verify', ensureAuth, (req, res) => {
  res.send({ valid: true });
});

module.exports = router;
