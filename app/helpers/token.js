const jwt = require('jwt-simple'),
  config = require('../../config'),
  { secret } = config.common.jwt;

exports.encodeToken = email => jwt.encode({ email, expiresAt: Math.floor(Date.now() / 1000) }, secret);

exports.decodedToken = token => jwt.decode(token, secret, true);
