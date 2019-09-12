const { Mutation: mutations } = require('../../app/graphql/albums/resolvers');

describe('Albums', () => {
  describe('resolvers', () => {
    describe('buyAlbum', () => {
      it.only('should purshase an album successfuly', () => {
        const album = { albumId: 1, title: 'prueba', userId: 1 };
        return mutations.buyAlbum({}, album).then(res => {
          expect(res).toHaveProperty('albumId');
          expect(res).toHaveProperty('title');
          expect(res).toHaveProperty('userId');
        });
      });

      it('should not buy a successful album.', () => {
        const album = { albumId: 1, title: 'prueba', userId: 1 };
        return mutations
          .buyAlbum({}, album)
          .then(() => mutations.buyAlbum({}, album))
          .catch(err => {
            expect(err.extensions.code).toBe(400);
          });
      });
    });
  });
});
