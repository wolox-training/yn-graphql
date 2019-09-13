const { searchCache } = require('../../cache/cache');

const getAlbumsList = (resolve, root, args) => {
  const keyValue = args.offset + args.limit + args.orderBy + args.filter;
  return searchCache(resolve, root, args, keyValue);
};

const getAlbum = (resolve, root, args) => {
  const keyValue = `album${args.id}`;
  return searchCache(resolve, root, args, keyValue);
};

module.exports = {
  Query: {
    albums: getAlbumsList,
    album: getAlbum
  },
  User: {}
};
