const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Observations, Observer, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all observations
router.get('/', (req, res) => {
    console.log('======================');
    Observations.findAll({
        attributes: [
            'observations_id',
            'observations_name',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'observations_id', 'observer_id', 'created_at'],
                include: {
                    model: Observer,
                    attributes: ['observer_name']
                }
            },
            {
                model: Observer,
                attributes: ['observer_name','observer_location','email']
            }
        ]
    })
        .then(dbObservationsData => res.json(dbObservationsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Observations.findOne({
        where: {
            observations_id: req.params.observations_id
        },
        attributes: [
            'observations_id',
            'observations_name',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'observations_id', 'observer_id', 'created_at'],
                include: {
                    model: Observer,
                    attributes: ['observer_name']
                }
            },
            {
                model: Observer,
                attributes: ['observer_name']
            }
        ]
    })
        .then(dbObservationsData => {
            if (!dbObservationsData) {
                res.status(404).json({ message: 'No observations found with this id' });
                return;
            }
            res.json(dbObservationsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Observations.create({
        observations_name: req.body.observations_name,
        observer_id: req.session.observer_id
    })
        .then(dbObservationsData => res.json(dbObservationsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Observations.update(
        {
            observations_name: req.body.observations_name
        },
        {
            where: {
                observations_id: req.params.observations_id
            }
        }
    )
        .then(dbObservationsData => {
            if (!dbObservationsData) {
                res.status(404).json({ message: 'No observations found with this id' });
                return;
            }
            res.json(dbObservationsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    console.log('observations_id', req.params.observations_id);
    Observations.destroy({
        where: {
            observations_id: req.params.observations_id
        }
    })
        .then(dbObservationsData => {
            if (!dbObservationsData) {
                res.status(404).json({ message: 'No observations found with this id' });
                return;
            }
            res.json(dbObservationsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
