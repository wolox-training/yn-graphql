const { user: User } = require('../models'),
  logger = require('../logger'),
  errors = require('../errors');

exports.userAlreadyExists = email =>
  User.findOne({
    where: { email },
    attributes: ['id']
  }).catch(err => {
    logger.error(err);
    throw errors.dataBaseError(err.message);
  });
