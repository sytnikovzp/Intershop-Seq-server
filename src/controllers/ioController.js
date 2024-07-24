const createError = require('http-errors');

const {
  Brand,
  IM,
  Sequelize: { Op },
  sequelize,
} = require('../db/models');

class IOController {
  async getBrandModelCounts(req, res, next) {
    try {
      const brands = await Brand.findAll({
        attributes: [
          'id',
          'title',
          [sequelize.fn('COUNT', sequelize.col('IMs.id')), 'modelCount'],
        ],
        include: [
          {
            model: IM,
            attributes: [],
          },
        ],
        group: ['Brand.id'],
        order: [['id', 'ASC']],
        raw: true,
      });

      if (brands.length > 0) {
        console.log(`Result is: ${JSON.stringify(brands, null, 2)}`);
        res.status(200).json(brands);
      } else {
        next(createError(404, 'Brands not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
}

module.exports = new IOController();
