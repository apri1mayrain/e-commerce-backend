const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{model: Product}]
  })
  .then((tags) => {
    res.json(tags)
  })
  .catch((err) => res.json(err));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [{model: Product}]
  })
  .then((tag) => {
    if(!tag) {
      res.json({message: 'Tag ID not found.'});
      return;
    }
    res.json(tag);
  })
  .catch((err) => res.json(err));
});

router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      tag_name: "computer"
    }
  */
  // create a new tag
  Tag.create(req.body)
  .then((tag => {
    if(!req.body.tag_name){
      res.json({ message: 'Please provide new tag.' });
      return;
    }
    res.json(tag);
  }))
  .catch((err => res.json(err)));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id }
  })
  .then((tag => {
    if(!tag) {
      res.json({ message: 'Tag ID not found.' });
      return;
    }
    res.json({ message: `Deleted tag with ID: ${req.params.id}.` });
  }))
  .catch((err) => res.json(err));
});

module.exports = router;