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
    res.json(categories)
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
    if(!category) {
      res.json({message: 'Category ID not found.'});
      return;
    }
    res.json(category);
  })
  .catch((err) => res.json(err));
});

router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      category_name: "Electronics"
    }
  */
  // create a new category
  Category.create(req.body)
  .then((category => {
    if(!req.body.category_name){
      res.json({ message: 'Please provide new category.' });
      return;
    }
    res.json(category);
  }))
  .catch((err => res.json(err)));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id }
  })
  .then((category => {
    if(!category) {
      res.json({ message: 'Category ID not found.' });
      return;
    }
    res.json({ message: `Deleted category with ID: ${req.params.id}.` });
  }))
  .catch((err) => res.json(err));
});

module.exports = router;