const config = require('../../../config'),
  { url } = config.common.apiAlbums,
  { getAlbumAndPhotos } = require('../../services/albums'),
  { orderArrayByField, filterArrayByTitle } = require('../../helpers/arraysFields');

const getAlbum = (_, params) => getAlbumAndPhotos(`${url}albums/${params.id}`);
const getAlbumsList = (_, params) =>
  getAlbumAndPhotos(`${url}albums`).then(result => {
    const startPage = params.offset * params.limit;
    const albumsFilter = filterArrayByTitle(result, params.filter);
    const albumsPagitation = albumsFilter.slice(startPage, startPage + params.limit);
    return orderArrayByField(albumsPagitation, params.orderBy);
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
