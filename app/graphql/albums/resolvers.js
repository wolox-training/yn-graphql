const config = require('../../../config'),
  { url } = config.common.apiAlbums,
  { getAlbumAndPhotos } = require('../../services/albums');

const getAlbum = (_, params) => getAlbumAndPhotos(`${url}albums/${params.id}`);

module.exports = {
  Query: {
    album: getAlbum
  },
  Album: {
    artist: root => root.userId,
    photos: root => getAlbumAndPhotos(`${url}photos?albumId=${root.id}`)
  }
};
