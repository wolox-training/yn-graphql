const { ApolloError } = require('apollo-server');

const createError = (message, statusCode) => new ApolloError(message, statusCode);

const DEFAULT_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  BAD_REQUEST = 400;

exports.defaultError = message => createError(message, DEFAULT_ERROR);
exports.badRequest = message => createError(message, BAD_REQUEST);
exports.serviceUnavailable = message => createError(message, SERVICE_UNAVAILABLE);
