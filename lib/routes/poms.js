const Router = require('express').Router;
const router = Router();
const Pom = require('../models/pom');

router.get('/', (req, res, next) => {
  Pom.find()
    .then(poms => res.send(poms))
    .catch(next);
})

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Pom.findById(id)
      .then(pom => {
        if (!pom) res.status(404).statusMessage(`${id} not found`);
        else res.send(pom);
      })
      .catch(next);
  })

  .post('/', (req, res, next) => {
    new Pom(req.body)
      .save()
      .then(pom => res.send(pom))
      .catch(next);
  });

module.exports = router;