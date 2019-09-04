const { factory } = require('factory-girl'),
  faker = require('faker'),
  models = require('../../app/models'),
  { user: User } = models,
  config = require('../../config/index'),
  bcrypt = require('bcryptjs'),
  { saltNumber } = config.common.bcrypt,
  salt = bcrypt.genSaltSync(Number(saltNumber));

factory.define(
  'user',
  User,
  {
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    email: () => faker.internet.email(faker.name.firstName(), faker.name.lastName(), 'wolox.com'),
    password: () => faker.internet.password()
  },
  {
    afterCreate: model => {
      model.password = bcrypt.hashSync(model.password, salt);
      return model.save();
    }
  }
);

module.exports = {
  create: params => factory.create('user', params),
  createMany: () => factory.createMany('user', 5),
  build: params => factory.build('user', params),
  attributes: params => factory.attrs('user', params)
};
