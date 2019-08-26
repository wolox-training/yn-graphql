const config = require('../../../config'),
  { url } = config.common.apiAlbums,
  { getAlbumAndPhotos } = require('../../services/albums'),
  { orderArrayByField } = require('../../helpers/orderByFields');

const getAlbum = (_, params) => getAlbumAndPhotos(`${url}albums/${params.id}`);

const getAlbumsList = (_, params) =>
  getAlbumAndPhotos(`${url}albums`).then(result => {
    const albums = [];
    const startPage = params.offset * params.limit;
    let count = 0;
    for (let i = startPage; i < result.length; i++) {
      if (count < params.limit) {
        albums.push(result[i]);
        count++;
      }
    }
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
