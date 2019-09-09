const { mutate } = require('../server.spec'),
  { createUser, login } = require('./graphql'),
  userFactory = require('../factories/user'),
  jwt = require('jwt-simple'),
  config = require('../../config'),
  { secret } = config.common.jwt,
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

    it('should not create user because mail does not belong to the wolox domain', () =>
      userFactory.attributes().then(user =>
        mutate(createUser({ ...user, email: 'pruebas@wolx.co', password: 'prueba1234' })).then(result => {
          expect(result.errors[0].message).toEqual(
            'email is not valid or does not belong to the wolox domain'
          );
        })
      ));

    it('should login an user successfuly', () =>
      userFactory.attributes().then(user =>
        mutate(createUser({ ...user, email: 'pruebas@wolox.co', password: 'prueba1234' }))
          .then(() => mutate(login({ email: 'pruebas@wolox.co', password: 'prueba1234' })))
          .then(result => {
            const decoded = jwt.decode(result.data.login.accessToken, secret);
            expect(decoded.email).toEqual('pruebas@wolox.co');
          })
      ));

    it('should not log in because the user does not exist', () =>
      userFactory.attributes().then(user =>
        mutate(createUser({ ...user, email: 'pruebas@wolox.co', password: 'prueba1234' }))
          .then(() => mutate(login({ email: 'prue@wolox.co', password: 'prueba1234' })))
          .then(result => {
            expect(result.errors[0].message).toEqual('user does not exist');
          })
      ));
  });
});
