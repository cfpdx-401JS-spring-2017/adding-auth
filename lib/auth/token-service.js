//Oh, is this why we had to promisify our Mongoose connect?
const jwt = require('jsonwebtoken-promisified');
const appSecret = process.env.APP_SECRET || 'come-change-this';

//what are all of these functions? Are they part of jwt?
module.exports = {
  sign(user) {
    const payload = {
      id: user._id,
      roles: user.roles
    };
    return jwt.signAsync(payload, appSecret);
  },
  verify(token) {
    return jwt.verifyAsync(token, appSecret);
  }
};

