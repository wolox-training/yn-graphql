const { mutate } = require('../server.spec'),
  { createUser } = require('./graphql'),
  userFactory = require('../factories/user'),
  { encryptionString } = require('../../app/helpers/encryption');

describe('users', () => {
  describe('mutations', () => {
    it('should create an user successfuly', () =>
      userFactory.attributes().then(user =>
        mutate(createUser(user)).then(res => {
          const { firstName, lastName, email, password, id } = res.data.createUser;
          expect(firstName).toEqual(user.firstName);
          expect(lastName).toEqual(user.lastName);
          expect(password).toEqual(encryptionString(user.password));
          expect(email).toEqual(user.email);
          expect(id).toBeDefined();
        })
      ));
  });
});
