const yup = require('yup');

const {
  BRAND_VALIDATION_SCHEMA,
  ITEM_MODEL_VALIDATION_SCHEMA,
  CUSTOMER_VALIDATION_SCHEMA,
  STORE_VALIDATION_SCHEMA,
  ITEM_TYPE_VALIDATION_SCHEMA,
  ITEM_CATEGORY_VALIDATION_SCHEMA,
  ORDER_VALIDATION_SCHEMA,
  ITEM_VALIDATION_SCHEMA,
  ITEMS_ORDERS_VALIDATION_SCHEMA,
} = require('../utils/validationSchemas');

module.exports.validateBrand = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedBrand = await BRAND_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    req.body = validatedBrand;
    next();
  } catch (error) {
    console.log(error.errors);
    next(`Error IS: ${error.errors}`);
  }
};

module.exports.validateIM = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedItemModel = await ITEM_MODEL_VALIDATION_SCHEMA.validate(
      body,
      {
        abortEarly: false,
      }
    );
    req.body = validatedItemModel;
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

module.exports.validateStore = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedStore = await STORE_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    req.body = validatedStore;
    next();
  } catch (error) {
    console.log(error.errors);
    next(`Error IS: ${error.errors}`);
  }
};

module.exports.validateIT = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedItemType = await ITEM_TYPE_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    req.body = validatedItemType;
    next();
  } catch (error) {
    console.log(error.errors);
    next(`Error IS: ${error.errors}`);
  }
};

module.exports.validateIC = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedItemCategory =
      await ITEM_CATEGORY_VALIDATION_SCHEMA.validate(body, {
        abortEarly: false,
      });
    req.body = validatedItemCategory;
    next();
  } catch (error) {
    console.log(error.errors);
    next(`Error IS: ${error.errors}`);
  }
};

module.exports.validateOrder = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedOrder = await ORDER_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    req.body = validatedOrder;
    next();
  } catch (error) {
    console.log(error.errors);
    next(`Error IS: ${error.errors}`);
  }
};

module.exports.validateItem = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedItem = await ITEM_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    req.body = validatedItem;
    next();
  } catch (error) {
    console.log(error.errors);
    next(`Error IS: ${error.errors}`);
  }
};

module.exports.validateItemsOrders = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedItemsOrders = await ITEMS_ORDERS_VALIDATION_SCHEMA.validate(
      body,
      {
        abortEarly: false,
      }
    );
    req.body = validatedItemsOrders;
    next();
  } catch (error) {
    console.log(error.errors);
    next(`Error IS: ${error.errors}`);
  }
};
