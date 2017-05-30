const router = require('express').Router();
const Artwork = require('../models/artwork');

router
  .get('/', (req, res, next) => {
    Artwork.find()
      .then(artwork => res.send(artwork))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Artwork.findById(req.params.id)
      .then(artwork => res.send(artwork))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    new Artwork(req.body)
      .save()
      .then(artwork => res.send(artwork))
      .catch(next);
  });

module.exports = router;