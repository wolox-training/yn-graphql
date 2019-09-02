const logger = require('../../logger'),
  errors = require('../../errors'),
  { userAlreadyExists } = require('../../services/usersDataBase'),
  { schemaSignUp } = require('../../helpers/schemasYup');

const createUser = async (resolve, root, args) => {
  try {
    await schemaSignUp.validate(args.user, { abortEarly: false });
  } catch (err) {
    logger.error(err.message);
    throw errors.signUpError(err.message);
  }
  const userExists = await userAlreadyExists(args.user.email);
  if (userExists !== null) {
    throw errors.dataBaseError('User already exists');
  }
  return resolve(root, args);
};

module.exports = {
  Mutation: {
    createUser
  },
  User: {}
};
