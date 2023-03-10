const router = require('express').Router();
const sequelize = require('../config/connection');
const { Observations, Observer, Comment } = require('../models');

// get all Observations for homepage
router.get('/', (req, res) => {
    console.log('======================');
    Observations.findAll({
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
                    attributes: ['observer_name','observer_location','email']
                }
            },
            {
                model: Observer,
                attributes: ['observer_name','observer_location','email']
            }
        ]
    })
        .then(dbObservationsData => {
            const observations = dbObservationsData.map(observations => observations.get({ plain: true }));

            res.render('homepage', {
                observations,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single observations
router.get('/observations/:id', (req, res) => {
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
                    attributes: ['observer_name','observer_location','email']
                }
            },
            {
                model: Observer,
                attributes: ['observer_name','observer_location','email']
            }
        ]
    })
        .then(dbObservationsData => {
            if (!dbObservationsData) {
                res.status(404).json({ message: 'No observations found with this id' });
                return;
            }

            const Observations = dbObservationsData.get({ plain: true });

            res.render('single-observations', {
                Observations,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
