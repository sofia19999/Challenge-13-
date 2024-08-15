const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, attributes: ['category_name'] },
        { model: Tag, through: ProductTag, as: 'tags' }
      ]
    });
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: 'Failed to retrieve products', details: err.message });
  }
});

// GET one product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
      include: [
        { model: Category, attributes: ['category_name'] },
        { model: Tag, through: ProductTag, as: 'tags' }
      ]
    });

    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(`Error fetching product with ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to retrieve product', details: err.message });
  }
});

// POST create a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    // If there are tags, create pairings in ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });

      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(400).json({ error: 'Failed to create product', details: err.message });
  }
});

// PUT update a product by ID
router.put('/:id', async (req, res) => {
  try {
    // Update product details
    await Product.update(req.body, {
      where: { id: req.params.id },
    });

    // Update product tags if tagIds are provided
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      // Create a filtered list of new tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // Determine which tags to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both destroy and bulkCreate actions
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    // Retrieve the updated product
    const updatedProduct = await Product.findOne({
      where: { id: req.params.id },
      include: [
        { model: Category, attributes: ['category_name'] },
        { model: Tag, through: ProductTag, as: 'tags' }
      ]
    });

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(`Error updating product with ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to update product', details: err.message });
  }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.destroy({
      where: { id: req.params.id },
    });

    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(`Error deleting product with ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to delete product', details: err.message });
  }
});

module.exports = router;