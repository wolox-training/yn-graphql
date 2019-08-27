const { user: User } = require('../../models'),
  { userLoggedIn } = require('../events'),
  config = require('../../../config/index'),
  bcrypt = require('bcryptjs'),
  { saltNumber } = config.common.bcrypt,
  salt = bcrypt.genSaltSync(Number(saltNumber)),
  logger = require('../../logger'),
  errors = require('../../errors');

const getUser = (_, params) => User.getOne(params);
const getUsers = (_, params) => User.getAll(params);

const createUser = (_, { user }) => {
  user.password = bcrypt.hashSync(user.password, salt);
  return User.createModel(user)
    .then(result => {
      logger.info(`the user was created correctly: ${user.firstName}`);
      return result;
    })
    .catch(err => {
      logger.error(`Could not create user: ${user.firstName}`);
      throw errors.dataBaseError(err.message);
    });
};

const logIn = (_, { credentials }) => {
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
    email: root => root.email
  }
};
