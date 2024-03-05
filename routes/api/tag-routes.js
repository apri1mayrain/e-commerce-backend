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
    // Return all tags
    res.status(200).json(tags)
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
    // Notify user if tag ID doesn't exist
    if(!tag) {
      res.json({message: 'Tag ID not found.'});
      return;
    }
    // Return requested tag
    res.status(200).json(tag);
  })
  .catch((err) => res.json(err));
});

router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      tag_name: "computer"
    }
  */
  // If tag_name is empty, notify user
  if(!req.body.tag_name){
    res.json({ message: 'Please provide new tag.' });
    return;
  }
  // Otherwise, create and return the new tag
  Tag.create(req.body)
  .then((tag => {
    res.status(200).json(tag);
  }))
  .catch((err => res.json(err)));
});

router.put('/:id', (req, res) => {
  /* req.body should look like this...
    {
      tag_name: "computer"
    }
  */
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: { id: req.params.id }
  })
  .then((tag => {
  // If tag doesn't exist or has the same value, notify user
    if(tag[0] === 0){
      res.json({ message: 'Cannot update tag.' });
      return;
    }
    res.status(200).json(tag);
  }))
  .catch((err => res.json(err)))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id }
  })
  .then((tag => {
    // Notify user if tag ID doesn't exist
    if(!tag) {
      res.json({ message: 'Tag ID not found.' });
      return;
    }
    res.status(200).json({ message: `Deleted tag with ID: ${req.params.id}.` });
  }))
  .catch((err) => res.json(err));
});

module.exports = router;