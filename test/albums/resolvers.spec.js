const { Mutation: mutations } = require('../../app/graphql/albums/resolvers');

describe('Albums', () => {
  describe('resolvers', () => {
    describe('buyAlbum', () => {
      it('should purshase an album successfuly', () => {
        const album = { albumId: 1, title: 'prueba', userId: 1 };
        return mutations.buyAlbum({}, album).then(res => {
          expect(res).toHaveProperty('albumId');
          expect(res).toHaveProperty('title');
          expect(res).toHaveProperty('userId');
        });
      });
    });
  });
});
