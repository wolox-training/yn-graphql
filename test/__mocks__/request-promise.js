const { photos, album, albumList } = require('../fixture/albumPhotos');

module.exports = jest.fn(param => {
  const search = param.uri.search('photos');
  if (search === -1) {
    const splitUri = param.uri.split('/');
    if (isNaN(parseInt(splitUri[4]))) {
      return Promise.resolve(albumList);
    }
    return Promise.resolve(album);
  }
  return Promise.resolve(photos);
});
