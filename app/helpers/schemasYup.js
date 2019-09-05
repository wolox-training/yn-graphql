const yup = require('yup'),
  { regexEmail, regexAlphanumeric } = require('../helpers/regex');

exports.schemaSignUp = yup.object().shape({
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

exports.schemaSignIn = yup.object().shape({
  password: yup.string().required('password is required'),
  email: yup
    .string()
    .required('email is required')
    .email('email is not valid')
    .matches(regexEmail, 'email is not valid or does not belong to the wolox domain')
});
