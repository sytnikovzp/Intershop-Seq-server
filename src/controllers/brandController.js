const createError = require('http-errors');

const { Brand, sequelize } = require('../db/models');

class BrandController {
  async getBrands(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const brands = await Brand.findAll({
        attributes: ['id', 'title', 'description'],
        raw: true,
        limit,
        offset,
        order: [['id', 'DESC']],
      });
      if (brands.length > 0) {
        console.log(`Result is: ${JSON.stringify(brands, null, 2)}`);
        res.status(200).json(brands);
      } else {
        next(createError(404, 'Brands not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error.message);
    }
  }

  async getBrandById(req, res, next) {
    try {
      const {
        params: { brandId },
      } = req;

      const brand = await Brand.findOne({
        where: { id: brandId },
        attributes: ['id', 'title'],
        raw: true,
      });

      if (brand) {
        console.log(`Result is: ${JSON.stringify(brand, null, 2)}`);
        res.status(200).json(brand);
      } else {
        next(createError(404, 'Brand not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error.message);
    }
  }

  // async createBrand(req, res) {
  //   try {
  //     const { title, genre, shelves, description, image } = req.body;
  //     const newBrand = await db.query(
  //       `INSERT INTO brands (title, genre_id, shelf_id, description, "createdAt", "updatedAt", image)
  //       VALUES ($1, (SELECT id FROM genres WHERE title = $2), (SELECT id FROM shelves WHERE title = $3), $4, NOW(), NOW(), $5)
  //       RETURNING *;`,
  //       [title, genre, shelves, description, image]
  //     );

  //     if (newBrand.rows.length > 0) {
  //       res.status(201).json(newBrand.rows[0]);
  //     } else {
  //       res.status(500).send('The brand has not been created');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // }

  // async updateBrand(req, res) {
  //   try {
  //     const { title, genre, shelves, description, image, id } = req.body;
  //     const updatedBrand = await db.query(
  //       `UPDATE brands
  //       SET title=$1, genre_id=(SELECT id FROM genres WHERE title = $2), shelf_id=(SELECT id FROM shelves WHERE title = $3), description=$4, "updatedAt"=NOW(), image=$5 WHERE id=$6 RETURNING *`,
  //       [title, genre, shelves, description, image, id]
  //     );

  //     if (updatedBrand.rows.length > 0) {
  //       res.status(201).json(updatedBrand.rows[0]);
  //     } else {
  //       res.status(404).send('Brand not found');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // }

  // async deleteBrand(req, res) {
  //   try {
  //     const {
  //       params: { brandId },
  //     } = req;
  //     const delBrand = await db.query(
  //       `DELETE FROM brands WHERE id=$1 RETURNING title, id`,
  //       [brandId]
  //     );

  //     if (delBrand.rows.length > 0) {
  //       res.status(204).json(delBrand.rows[0]);
  //     } else {
  //       res.status(404).send('Brand not found');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // }
}

module.exports = new BrandController();
