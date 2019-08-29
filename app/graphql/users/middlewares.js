const logger = require('../../logger'),
  yup = require('yup'),
  { user: User } = require('../../models'),
  errors = require('../../errors');

const regexEmail = new RegExp(
  /^(([^<>\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@wolox.(co|com|com.ar)\s*$/
);
const regexAlphanumeric = new RegExp(/^[a-zA-Z0-9_]*$/);

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
  const { email } = args.user;

  const userAlreadyExists = await User.findAndCountAll({
    where: { email },
    select: ['id']
  });

  if (userAlreadyExists.count === 1) {
    throw errors.dataBaseError('User already exists');
  }

  return resolve(root, args);
};

module.exports = {
  // Here you add all the middlewares for the mutations, queries or field resolvers if you have any
  Mutation: {
    createUser
  },
  User: {}
};
