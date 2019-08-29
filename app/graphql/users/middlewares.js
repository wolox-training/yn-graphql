const logger = require('../../logger'),
  yup = require('yup'),
  errors = require('../../errors'),
  { regexEmail, regexAlphanumeric } = require('../../helpers/regex'),
  { userAlreadyExists } = require('../../services/usersDataBase');

const schema = yup.object().shape({
  password: yup
    .string()
    .required('password is required')
    .min(8, 'Must be at least 8 chars long')
    .matches(regexAlphanumeric, 'email is not valid or does not belong to the wolox domain'),
  email: yup
    .string()
    .required('email is required')
    .email('email is not valid')
    .matches(regexEmail, 'email is not valid or does not belong to the wolox domain')
});

const createUser = async (resolve, root, args) => {
  try {
    await schema.validate(args.user, { abortEarly: false });
  } catch (err) {
    logger.err(err.message);
    throw errors.signUpError(err.message);
  }
  const userExists = await userAlreadyExists(args.use.email);
  if (userExists.count === 1) {
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
