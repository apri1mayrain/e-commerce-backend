const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{model: Product}]
  })
  .then((categories) => {
    // Return all categories
    res.status(200).json(categories)
  })
  .catch((err) => res.json(err));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [{model: Product}]
  })
  .then((category) => {
    // Notify user if category ID doesn't exist
    if(!category) {
      res.json({message: 'Category ID not found.'});
      return;
    }
    // Return requested category
    res.status(200).json(category);
  })
  .catch((err) => res.json(err));
});

router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      category_name: "Electronics"
    }
  */
  // If category_name is empty, notify user
  if(!req.body.category_name){
    res.json({ message: 'Please provide new category.' });
    return;
  }
  // Otherwise, create and return the new category
  Category.create(req.body)
  .then((category => {
    res.status(200).json(category);
  }))
  .catch((err => res.json(err)));
});

router.put('/:id', (req, res) => {
  /* req.body should look like this...
    {
      category_name: "Electronics"
    }
  */
  // update a category by its `id` value
  Category.update(req.body, {
    where: { id: req.params.id }
  })
  .then((category => {
    // If category doesn't exist or has the same value, notify user
    if(category[0] === 0){
      res.json({ message: 'Cannot update category.' });
      return;
    }
    // Notify user category was successfully updated
    res.status(200).json({ message: `Updated category with ID: ${req.params.id}.` });
  }))
  .catch((err => res.json(err)))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id }
  })
  .then((category => {
    // Notify user if category ID doesn't exist
    if(!category) {
      res.json({ message: 'Category ID not found.' });
      return;
    }
    // Notify user the category was successfully deleted
    res.status(200).json({ message: `Deleted category with ID: ${req.params.id}.` });
  }))
  .catch((err) => res.json(err));
});

module.exports = router;