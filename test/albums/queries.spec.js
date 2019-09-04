const { query } = require('../server.spec'),
  { getAlbum, getAlbums } = require('./graphql'),
  { albumTest } = require('../fixture/albumPhotos');

describe('albums', () => {
  describe('queries', () => {
    it('should get album properly', () =>
      query(getAlbum(1)).then(res => {
        expect(res.data.album).toEqual(albumTest);
      }));
  });

  it('should get all albums', () =>
    query(getAlbums(0, 5, 'title', 'Prueba')).then(res => {
      expect(res.data.albums).toHaveLength(2);
    }));
});
