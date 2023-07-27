const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint, //

// Gets all products. //
router.get('/', async (req, res) => {
  try {
    // Finds all products and includes their associated Category and Tag data. //
    const allProducts = await Product.findAll({
      include: [Category, { model: Tag, through: ProductTag }],
    });
    res.json(allProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Gets one product. //
router.get('/:id', async (req, res) => {
  try {
    // Finds a single product by its `id` and includes its associated Category and Tag data. //
    const oneProduct = await Product.findByPk(req.params.id, {
      include: [Category, { model: Tag, through: ProductTag }],
    });

    if (!oneProduct) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }

    res.status(200).json(oneProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new product. //
router.post('/', async (req, res) => {
  try {
    // Create a new product with the provided request body
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }

  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
 
  if (req.body) {
    const productTagId = req.body.map((tag_id) => {
      return {
        product_name, 
        price, 
        stock,
        tag_id
      };
    });
    
    // Bulk creates productTag associations. //
    ProductTag.bulkCreate(productTagId)
      .then((productTagIds) => res.status(200).json(productTagIds))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  } else {
    // If no product tags, responds with status. //
    res.status(200).json(newProduct);
  }
});

// Updates product, //
router.put('/:id', (req, res) => {
  // Update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // Finds all associated tags from ProductTag. //
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // Gets a list of current tag_ids. //
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // Creates a filtered list of new tag_ids. //
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // Figures out which ones to remove. //
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Runs both actions: removes existing associations and creates new ones. //
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err): //
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  try {
    // Deletes a product by its `id`. //
    const deleteProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteProduct) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }
    res.status(200).json(deleteProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
