const { searchCache } = require('../../cache/cache');

const getAlbumsList = (resolve, root, args) => searchCache(resolve, root, args, 'albums');

const getAlbum = (resolve, root, args) => searchCache(resolve, root, args, 'albums');

module.exports = {
  Query: {
    albums: getAlbumsList,
    album: getAlbum
  },
  User: {}
};
