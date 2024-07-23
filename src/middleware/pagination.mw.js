const { PAGINATION_SCHEMA } = require('../utils/validationSchemas');

module.exports.paginateElements = async (req, res, next) => {
  const { page, result } = req.query;

  const defaultPagination = {
    limit: 10,
    offset: 0,
  };

  const pagination = {
    limit: result ?? 10,
    offset: (page - 1) * result || 0,
  };

  try {
    if (await PAGINATION_SCHEMA.isValid(pagination)) {
      req.pagination = pagination;
    } else {
      req.pagination = defaultPagination;
    }
    next();
  } catch (error) {
    console.log(error.message);
    next(error.message);
  }
};
