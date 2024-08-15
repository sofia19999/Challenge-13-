const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
          as: 'products'
        }
      ]
    });
    res.status(200).json(tags);
  } catch (err) {
    console.error("Error fetching tags:", err);
    res.status(500).json({ error: 'Failed to retrieve tags', details: err.message });
  }
});

// GET a single tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Product,
          through: ProductTag,
          as: 'products'
        }
      ]
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    console.error(`Error fetching tag with ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to retrieve tag', details: err.message });
  }
});

// POST create a new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    console.error("Error creating tag:", err);
    res.status(400).json({ error: 'Failed to create tag', details: err.message });
  }
});

// PUT update a tag by ID
router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    if (!tag[0]) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) {
    console.error(`Error updating tag with ID ${req.params.id}:`, err);
    res.status(400).json({ error: 'Failed to update tag', details: err.message });
  }
});

// DELETE a tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    console.error(`Error deleting tag with ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to delete tag', details: err.message });
  }
});

module.exports = router;