const errors = require('../../errors'),
  { decodedToken } = require('../../helpers/token'),
  { getAlbumAndPhotos } = require('../../services/albums'),
  config = require('../../../config'),
  { url } = config.common.apiAlbums,
  { findOneUser } = require('../../services/usersDataBase'),
  { findOneAlbum } = require('../../services/albumsDataBase');

const buyAlbum = async (resolve, root, args, context) => {
  const { albumId } = args,
    token = decodedToken(context.authorization),
    source = `${url}albums/${albumId}`,
    user = await findOneUser(token.email),
    albums = await getAlbumAndPhotos(source);
  if (!user) {
    throw errors.dataBaseError('user does not exist');
  }
  if (!albums) {
    throw errors.buyAlbumsError('Album does not exist');
  }
  const purchasedAlbum = await findOneAlbum(albumId, user.id);
  if (purchasedAlbum) {
    throw errors.buyAlbumsError('you cannot buy this album again');
  }
  return resolve(root, { albumId, title: albums.title, userId: user.id });
};

module.exports = {
  Mutation: {
    buyAlbum
  },
  Album: {}
};
