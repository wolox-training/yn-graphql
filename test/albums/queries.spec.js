const { query } = require('../server.spec'),
  { getAlbum, getAlbums } = require('./graphql'),
  { albumTest, albumsTest } = require('../fixture/albumPhotos');

describe('albums', () => {
  describe('queries', () => {
    it('should get album properly', () => {
      let timeBeforeCache = new Date();
      let timeAfterCache = 0;
      return query(getAlbum(1))
        .then(() => {
          timeBeforeCache = new Date() - timeBeforeCache;
          timeAfterCache = new Date();
          return query(getAlbum(1));
        })
        .then(res => {
          timeAfterCache = new Date() - timeAfterCache;
          expect(timeAfterCache < timeBeforeCache).toEqual(true);
          expect(res.data.album).toEqual(albumTest);
        });
    });

    it('should get all albums cache', () => {
      let timeBeforeCache = new Date();
      let timeAfterCache = 0;
      return query(getAlbums(0, 2, 'title', 'Prueba'))
        .then(() => {
          timeBeforeCache = new Date() - timeBeforeCache;
          timeAfterCache = new Date();
          return query(getAlbums(0, 2, 'title', 'Prueba'));
        })
        .then(res => {
          timeAfterCache = new Date() - timeAfterCache;
          expect(timeAfterCache < timeBeforeCache).toEqual(true);
          expect(res.data.albums).toHaveLength(2);
          expect(res.data.albums).toEqual(albumsTest);
        });
    });
  });
});
