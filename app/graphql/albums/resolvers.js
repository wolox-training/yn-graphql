const config = require('../../../config'),
  { url } = config.common.apiAlbums,
  { getAlbumAndPhotos } = require('../../services/albums'),
  { orderArrayByField } = require('../../helpers/orderByFields');

const getAlbum = (_, params) => getAlbumAndPhotos(`${url}albums/${params.id}`);
const getAlbumsList = (_, params) =>
  getAlbumAndPhotos(`${url}albums`).then(result => {
    const startPage = params.offset * params.limit;
    const albums = result.slice(startPage, startPage + params.limit);
    return orderArrayByField(albums, params.orderBy);
  });

module.exports = {
  Query: {
    album: getAlbum,
    albums: getAlbumsList
  },
  Album: {
    artist: root => root.userId,
    photos: root => getAlbumAndPhotos(`${url}photos?albumId=${root.id}`)
  }
};
