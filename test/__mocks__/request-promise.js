const { photo, album, albumList } = require('../fixture/albumPhotos');

module.exports = jest.fn(param => {
  const splitUri = param.uri.split('?')[1];
  const photos = param.uri.search('photos');
  if (photos === -1) {
    if (splitUri !== undefined) {
      return Promise.resolve(album);
    }
    return Promise.resolve(albumList);
  }
  return Promise.resolve(photo);
});
