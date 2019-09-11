const config = require('../../../config'),
  { url } = config.common.apiAlbums,
  { getAlbumAndPhotos } = require('../../services/albums'),
  { orderArrayByField, filterArrayByField } = require('../../helpers/arraysFields'),
  { filterTitleAlbum } = require('../../constants/albumsConstants'),
  { album: Album } = require('../../models'),
  logger = require('../../logger'),
  errors = require('../../errors');

const getAlbum = (_, params) => getAlbumAndPhotos(`${url}albums/${params.id}`);
const getAlbumsList = (_, params) =>
  getAlbumAndPhotos(`${url}albums`).then(result => {
    const startPage = params.offset * params.limit;
    const albumsFilter = filterArrayByField(result, params.filter, filterTitleAlbum);
    const albumsPagitation = albumsFilter.slice(startPage, startPage + params.limit);
    return orderArrayByField(albumsPagitation, params.orderBy);
  });

const buyAlbum = (_, params) =>
  Album.createModel(params)
    .then(() => {
      logger.info(`the purchase of the album was done correctly: ${params.name}`);
      return params;
    })
    .catch(err => {
      logger.error(`the purchase of the album was not made correctly: ${params.name}`);
      throw errors.dataBaseError(err.errors);
    });

module.exports = {
  Query: {
    album: getAlbum,
    albums: getAlbumsList
  },
  Mutation: {
    buyAlbum
  },
  Album: {
    artist: root => root.userId,
    photos: root => getAlbumAndPhotos(`${url}photos?albumId=${root.id}`)
  }
};
