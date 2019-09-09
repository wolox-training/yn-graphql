const logger = require('../../logger'),
  errors = require('../../errors'),
  { findOneUser } = require('../../services/usersDataBase'),
  bcrypt = require('bcryptjs'),
  { schemaSignUp, schemaSignIn } = require('../../helpers/schemasYup');

const createUser = async (resolve, root, args) => {
  try {
    await schemaSignUp.validate(args.user, { abortEarly: false });
  } catch (err) {
    logger.error(err.errors);
    throw errors.signUpError(err.errors);
  }
  const userExists = await findOneUser(args.user.email);
  if (userExists !== null) {
    throw errors.dataBaseError('User already exists');
  }
  return resolve(root, args);
};

const logIn = async (resolve, root, args) => {
  try {
    await schemaSignIn.validate(args.credentials, { abortEarly: false });
  } catch (err) {
    logger.error(err.errors);
    throw errors.signInError(err.errors);
  }
  const result = await findOneUser(args.credentials.email);
  if (!result) {
    throw errors.signInError('user does not exist');
  }
  const compare = await bcrypt.compare(args.credentials.password, result.password);
  if (!compare) {
    throw errors.signInError('email or password incorrect');
  }
  return resolve(root, args);
};

module.exports = {
  Mutation: {
    createUser,
    login: logIn
  },
  User: {}
};
