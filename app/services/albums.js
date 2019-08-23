const request = require('request-promise'),
  logger = require('../logger'),
  errors = require('../errors'),
  config = require('../../config'),
  { url } = config.common.apiAlbums;

exports.getAlbumSources = urlApi => {
  const options = {
    uri: urlApi,
    json: true
  };
  return request(options).catch(err => {
    logger.error(err);
    throw errors.serviceUnavailable(err.message);
  });
};

exports.getAlbumPhotos = async params => {
  try {
    const album = await exports.getAlbumSources(`${url}albums/${params.id}`);
    const photosAlbum = await exports.getAlbumSources(`${url}photos?albumId=${params.id}`);
    return {
      id: album.id,
      title: album.title,
      artist: album.userId,
      photos: photosAlbum
    };
  } catch (err) {
    throw err;
  }
};
