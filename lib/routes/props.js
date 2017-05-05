const Router = require('express').Router;
const router = Router();

const Prop = require('../models/prop');

router
    .get('/', (req, res, next) => {
        Prop.find()
            .lean()
            .select('-__v')
            .then(props => res.send(props))
            .catch(next);
    })

    .get('/:id', (req, res, next)=> {
        const id = req.params.id;
        Prop.findById(id)
            .lean()
            .then(prop => {
                if(!prop) return res.status(404).send('not found');
                res.send(prop);
            })
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Prop(req.body)
            .save()
            .then(prop => res.send(prop))
            .catch(next);
    });

module.exports = router;