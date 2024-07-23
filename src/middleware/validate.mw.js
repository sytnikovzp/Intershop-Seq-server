const yup = require('yup');

const {
  AUTHOR_VALIDATION_SCHEMA,
  CUSTOMER_VALIDATION_SCHEMA,
  NEW_ITEM_VALIDATION_SCHEMA,
} = require('../utils/validationSchemas');

module.exports.validateAuthor = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedAuthor = await AUTHOR_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    req.body = validatedAuthor;
    next();
  } catch (error) {
    console.log(error.errors);
    next(`Error IS: ${error.errors}`);
  }
};

module.exports.validateCustomer = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedCustomer = await CUSTOMER_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    req.body = validatedCustomer;
    next();
  } catch (error) {
    console.log(error.errors);
    next(`Error IS: ${error.errors}`);
  }
};

module.exports.validateItem = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedItem = await NEW_ITEM_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    req.body = validatedItem;
    next();
  } catch (error) {
    console.log(error.errors);
    next(`Error IS: ${error.errors}`);
  }
};
