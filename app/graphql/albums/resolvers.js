const config = require('../../../config'),
  { url } = config.common.apiAlbums,
  { getAlbumAndPhotos } = require('../../services/albums'),
  { orderArrayByField, filterArrayByField } = require('../../helpers/arraysFields'),
  { filterTitleAlbum } = require('../../constants/albumsConstants');

const getAlbum = (_, params) => getAlbumAndPhotos(`${url}albums?id=${params.id}`);
const getAlbumsList = (_, params) =>
  getAlbumAndPhotos(`${url}albums`).then(result => {
    const startPage = params.offset * params.limit;
    const albumsFilter = filterArrayByField(result, params.filter, filterTitleAlbum);
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
