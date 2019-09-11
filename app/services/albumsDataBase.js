const { album: Album } = require('../models'),
  logger = require('../logger'),
  errors = require('../errors');

exports.findOneAlbum = (albumId, userId) =>
  Album.findOne({
    where: { userId, albumId },
    attributes: ['id']
  }).catch(err => {
    logger.error(err);
    throw errors.dataBaseError(err.message);
  });
