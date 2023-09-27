const router = require('express').Router();
const { Category, Product } = require('../../models');
// Finds all categories (Plus associate values based on id s)
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    if (!categoryData) {
      res.status(500).json({ message:'Oh no! Something went went wrong. Please try your request again.'});
      return;
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});
// Finds one category (Plus associate values based on id)
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    if (!categoryData) {
      res.status(404).json({ message:'No catagory with that id found.'});
      return;
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});
// Creates a new category
router.post('/', async(req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(201).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updates a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with that id found.' });
      return;
    }
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes a category by its `id` value
router.delete('/:id', async(req, res) => {
   try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with that id found.' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
