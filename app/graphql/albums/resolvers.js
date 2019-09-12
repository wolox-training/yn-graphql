const config = require('../../../config'),
  { url } = config.common.apiAlbums,
  { getAlbumAndPhotos } = require('../../services/albums'),
  { orderArrayByField, filterArrayByField } = require('../../helpers/arraysFields'),
  { filterTitleAlbum } = require('../../constants/albumsConstants'),
  { album: Album } = require('../../models'),
  logger = require('../../logger'),
  { validatorBuyAlbums } = require('./interactors');
// errors = require('../../errors');

const getAlbum = (_, params) => getAlbumAndPhotos(`${url}albums/${params.id}`);
const getAlbumsList = (_, params) =>
  getAlbumAndPhotos(`${url}albums`).then(result => {
    const startPage = params.offset * params.limit;
    const albumsFilter = filterArrayByField(result, params.filter, filterTitleAlbum);
    const albumsPagitation = albumsFilter.slice(startPage, startPage + params.limit);
    return orderArrayByField(albumsPagitation, params.orderBy);
  });

const buyAlbum = async (_, params, context) => {
  try {
    const data = await validatorBuyAlbums({ ...params, authorization: context.authorization });
    const result = await Album.createModel(data);
    logger.info(`the purchase of the album was done correctly: ${data.title}`);
    return { ...result.dataValues, title: data.title };
  } catch (err) {
    logger.error('the purchase of the album was not made correctly');
    throw err;
  }
};

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
