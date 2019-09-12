const errors = require('../../errors'),
  { decodedToken } = require('../../helpers/token'),
  { getAlbumAndPhotos } = require('../../services/albums'),
  config = require('../../../config'),
  { url } = config.common.apiAlbums,
  { findOneUser } = require('../../services/usersDataBase'),
  { findOneAlbum } = require('../../services/albumsDataBase');

exports.validatorBuyAlbums = async args => {
  const { albumId } = args,
    token = decodedToken(args.authorization),
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
  return { albumId, title: albums.title, userId: user.id };
};
