const yup = require('yup');

const TITLE_NAME_SCHEMA = yup
  .string()
  .trim()
  .min(2)
  .max(30)
  .matches(/^[A-Z](\w+\s?){1,50}\w+$/);

const EMAIL_SCHEMA = yup.string().email().required();

const ID_SCHEMA = yup
  .number()
  .integer('This field must be integer!')
  .positive('This field must be more than 0!');

const AUTHOR_VALIDATION_SCHEMA = yup.object().shape({
  full_name: TITLE_NAME_SCHEMA.required(),
  email: EMAIL_SCHEMA,
  nationality_id: ID_SCHEMA,
});

const CUSTOMER_VALIDATION_SCHEMA = yup.object().shape({
  full_name: TITLE_NAME_SCHEMA,
  email: EMAIL_SCHEMA,
  phone: yup.string().nullable(),
  password: yup.string().required(),
});

const NEW_ITEM_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  genre_id: ID_SCHEMA,
  shelf_id: ID_SCHEMA,
});

const PATCH_ITEM_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
  genre_id: ID_SCHEMA,
  shelf_id: ID_SCHEMA,
});

const PAGINATION_SCHEMA = yup.object().shape({
  limit: yup.number().min(1).max(100).required(),
  offset: yup.number().positive().required(),
});

module.exports = {
  AUTHOR_VALIDATION_SCHEMA,
  CUSTOMER_VALIDATION_SCHEMA,
  NEW_ITEM_VALIDATION_SCHEMA,
  PATCH_ITEM_VALIDATION_SCHEMA,
  PAGINATION_SCHEMA
};
