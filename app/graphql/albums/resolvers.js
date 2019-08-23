const { getAlbumPhotos } = require('../../services/albums');

const getAlbum = (_, params) => getAlbumPhotos(params);

module.exports = {
  Query: {
    album: getAlbum
  },
  album: {
    id: root => root.id
  }
};
