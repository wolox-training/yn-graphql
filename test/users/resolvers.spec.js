const userFactory = require('../factories/user'),
  { Mutation: mutations } = require('../../app/graphql/users/resolvers');

describe('users', () => {
  describe('resolvers', () => {
    describe('createUser', () => {
      it('should create an user successfuly', async () => {
        const user = await userFactory.build();
        mutations.createUser({}, { user: user.dataValues }).then(res => {
          expect(res.dataValues).toHaveProperty('id');
          expect(res.dataValues).toHaveProperty('firstName');
          expect(res.dataValues).toHaveProperty('lastName');
          expect(res.dataValues).toHaveProperty('email');
          expect(res.dataValues).toHaveProperty('password');
          expect(res.dataValues).toHaveProperty('updatedAt');
          expect(res.dataValues).toHaveProperty('createdAt');
        });
      });

      it('should fail creating an user that already exist in database', async () => {
        const user = await userFactory.build();
        return mutations
          .createUser({}, { user: user.dataValues })
          .then(() => mutations.createUser({}, { user: user.dataValues }))
          .catch(err => {
            expect(err.extensions.code).toBe(503);
          });
      });
    });
  });
});
