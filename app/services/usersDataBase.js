const { user: User } = require('../models'),
  logger = require('../logger'),
  errors = require('../errors');

exports.findOneUser = email =>
  User.findOne({
    where: { email },
    attributes: ['id']
  }).catch(err => {
    logger.error(err);
    throw errors.dataBaseError(err.message);
  });
