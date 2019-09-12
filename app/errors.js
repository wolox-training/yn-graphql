const { ApolloError } = require('apollo-server');

const createError = (message, statusCode) => new ApolloError(message, statusCode);

const DEFAULT_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  BAD_REQUEST = 400,
  DATABASE_ERROR = 503,
  SIGN_UP_ERROR = 400,
  SIGN_IN_ERROR = 401,
  BUY_ALBUMS_ERROR = 400;

exports.defaultError = message => createError(message, DEFAULT_ERROR);
exports.badRequest = message => createError(message, BAD_REQUEST);
exports.serviceUnavailable = message => createError(message, SERVICE_UNAVAILABLE);
exports.dataBaseError = message => createError(message, DATABASE_ERROR);
exports.signUpError = message => createError(message, SIGN_UP_ERROR);
exports.signInError = message => createError(message, SIGN_IN_ERROR);
exports.buyAlbumsError = message => createError(message, BUY_ALBUMS_ERROR);
