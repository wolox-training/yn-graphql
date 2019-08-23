const config = require('../../../config'),
  { url } = config.common.apiAlbums,
  { getAlbumSources } = require('../../services/albums');

const getAlbum = (_, params) =>
  getAlbumSources(`${url}albums/${params.id}`).then(album => ({
    id: album.id,
    title: album.title,
    artist: album.userId
  }));

module.exports = {
  Query: {
    album: getAlbum
  },
  Album: {
    id: root => root.id,
    photos: params => getAlbumSources(`${url}photos?albumId=${params.id}`)
  }
};
