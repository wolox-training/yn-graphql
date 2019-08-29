const { user: User } = require('../models');

exports.userAlreadyExists = email =>
  User.findAndCountAll({
    where: { email },
    select: ['id']
  });
