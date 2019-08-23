const config = require('../../../config'),
  { url } = config.common.apiAlbums,
  { getAlbumSources } = require('../../services/albums');

const getAlbum = (_, params) => getAlbumSources(`${url}albums/${params.id}`);

module.exports = {
  Query: {
    album: getAlbum
  },
  Album: {
    artist: root => root.artist,
    photos: root => getAlbumSources(`${url}photos?albumId=${root.id}`)
  }
};
