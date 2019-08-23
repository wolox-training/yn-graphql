const request = require('request-promise'),
  logger = require('../logger'),
  errors = require('../errors');

exports.getAlbumSources = url => {
  const options = {
    uri: url,
    json: true
  };
  return request(options).catch(err => {
    logger.error(err);
    throw errors.albumsApiError(err.message);
  });
};
