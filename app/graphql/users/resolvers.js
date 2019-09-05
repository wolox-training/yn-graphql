const { user: User } = require('../../models'),
  { userLoggedIn } = require('../events'),
  { encryptionString } = require('../../helpers/encryption'),
  logger = require('../../logger'),
  errors = require('../../errors');

const getUser = (_, params) => User.getOne(params);
const getUsers = (_, params) => User.getAll(params);

const createUser = (_, { user }) =>
  User.createModel({ ...user, password: encryptionString(user.password) })
    .then(result => {
      logger.info(`the user was created correctly: ${user.firstName}`);
      return result;
    })
    .catch(err => {
      logger.error(`Could not create user: ${user.firstName}`);
      throw errors.dataBaseError(err.errors);
    });

const logIn = (_, { credentials }) => {
  console.log(credentials);
  // IMPORTANT: Not a functional login, its just for illustrative purposes
  userLoggedIn.publish(credentials.firstName);
  return {
    accessToken: 'example_token',
    refreshToken: 'example_refresh_token',
    expiresIn: 1565990270
  };
};

module.exports = {
  Query: {
    user: getUser,
    users: getUsers
  },
  Mutation: {
    createUser,
    login: logIn
  },
  Subscription: {
    onLogin: {
      subscribe: userLoggedIn.iter
    }
  },
  User: {
    email: root => root.email,
    name: root => `${root.firstName} ${root.lastName}`
  }
};
