const config = require('../../config/index'),
  bcrypt = require('bcryptjs'),
  { saltNumber } = config.common.bcrypt,
  salt = bcrypt.genSaltSync(Number(saltNumber));

exports.encryptionString = data => {
  const encryptionResult = bcrypt.hashSync(data, salt);
  return encryptionResult;
};
