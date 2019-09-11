// const graphqlTestServer = require('../server.spec'),
//   { login } = require('../users/graphql'),
//   { buyAlbum } = require('./graphql'),
//   userFactory = require('../factories/user');

// const { mutate } = graphqlTestServer();

// describe('albums', () => {
//   describe('mutations', () => {
//     it.only('should buy an album successfuly', () => {
//       const password = 'pass1234';
//       return userFactory.create({ password }).then(user => {
//         const { email } = user;
//         return mutate(login({ email, password }))
//           .then(res => {
//             const { accessToken } = res.data.login;
//             const context = { token: accessToken };
//             const { mutate: mutateWithContext } = graphqlTestServer(context);
//             return mutateWithContext(buyAlbum(1));
//           })
//           .then(res => {
//             const albumData = { ...res.data.buyAlbum };
//             expect(albumData).toHaveProperty('title');
//             expect(albumData).toHaveProperty('artist');
//             expect(albumData).toHaveProperty('photos');
//             expect(albumData).toHaveProperty('id');
//             expect(albumData.photos).toHaveLength(4);
//           });
//       });
//     });
//   });
// });
