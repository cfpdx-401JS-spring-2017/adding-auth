const Router = require('express').Router;
const router = Router();
const User = require('../models/user');
const ensureAuth = require('../auth/ensure-auth')();
const tokenService = require('../auth/token-service');

function hasEmailAndPassword(req, res, next) {
    const user = req.body;
    if(!user || !user.password) {
        return next({
            code: 400,
            error: 'email and password required'
        });
    } 
    next();
}

// router
// module.exports = router;