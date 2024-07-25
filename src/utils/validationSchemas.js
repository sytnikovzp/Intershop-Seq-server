const yup = require('yup');

// ==================== GENERAL =======================

const TITLE_NAME_SCHEMA = yup
  .string()
  .trim()
  .min(2)
  .max(30)
  .matches(/^[A-Z](\w+\s?){1,50}\w+$/)
  .required();

const ID_SCHEMA = yup
  .number()
  .integer('This field must be integer!')
  .positive('This field must be more than 0!');

const PAGINATION_SCHEMA = yup.object().shape({
  limit: yup.number().min(1).max(100).required(),
  offset: yup.number().positive().required(),
});

// ==================== FOR ENTITIES =======================

const BRAND_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
});

const ITEM_MODEL_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
  brand_id: ID_SCHEMA,
});

const CUSTOMER_VALIDATION_SCHEMA = yup.object().shape({
  full_name: TITLE_NAME_SCHEMA,
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const STORE_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
});

const ITEM_TYPE_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
});

const ITEM_CATEGORY_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
});

const ORDER_VALIDATION_SCHEMA = yup.object().shape({
  code: yup
    .number()
    .integer('This field must be integer!')
    .positive('This field must be more than 0!'),
  date: yup.date(),
  customer_id: ID_SCHEMA,
  amount: yup
    .number()
    .integer('This field must be integer!')
    .positive('This field must be more than 0!'),
  paid: yup.boolean(),
});

const ITEM_VALIDATION_SCHEMA = yup.object().shape({
  category_id: ID_SCHEMA,
  type_id: ID_SCHEMA,
  brand_id: ID_SCHEMA,
  model_id: ID_SCHEMA,
  price: yup.number().positive('This field must be more than 0!'),
  store_id: ID_SCHEMA,
  amount: yup
    .number()
    .integer('This field must be integer!')
    .positive('This field must be more than 0!'),
});

// const ITEMS_ORDERS_VALIDATION_SCHEMA = yup.object().shape({
//   item_id: ID_SCHEMA,
//   order_id: ID_SCHEMA,
// });

module.exports = {
  PAGINATION_SCHEMA,
  BRAND_VALIDATION_SCHEMA,
  ITEM_MODEL_VALIDATION_SCHEMA,
  CUSTOMER_VALIDATION_SCHEMA,
  STORE_VALIDATION_SCHEMA,
  ITEM_TYPE_VALIDATION_SCHEMA,
  ITEM_CATEGORY_VALIDATION_SCHEMA,
  ORDER_VALIDATION_SCHEMA,
  ITEM_VALIDATION_SCHEMA,
  // ITEMS_ORDERS_VALIDATION_SCHEMA,
};
