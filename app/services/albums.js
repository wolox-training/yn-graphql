const request = require('request-promise'),
  logger = require('../logger'),
  errors = require('../errors');

exports.getAlbumsAndPhotos = url => {
  const options = {
    uri: url,
    json: true
  };
  return request(options).catch(err => {
    logger.error(err);
    throw errors.serviceUnavailable(err.message);
  });
};
