const router = require('express').Router();
const { Observer, Observations, Comment } = require('../../models');

// get all Observers
router.get('/', (req, res) => {
    Observer.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbObserverData => res.json(dbObserverData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Observer.findOne({
        attributes: { exclude: ['password'] },
        where: {
            observer_id: req.params.id
        },
        include: [
            {
                model: Observations,
                attributes: ['observations_id', 'observations_name','created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Observations,
                    attributes: ['observations_name']
                }
            },
        ]
    })
        .then(dbObserverData => {
            if (!dbObserverData) {
                res.status(404).json({ message: 'No Observer found with this id' });
                return;
            }
            res.json(Observer);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Observer.create({
        observer_name: req.body.observer_name,
        observer_location: req.body.observer_location,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbObserverData => {
            req.session.save(() => {
                req.session.observer_id = dbObserverData.id;
                req.session.observer_name = dbObserverData.observer_name;
                req.session.loggedIn = true;

                res.json(dbObserverData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    Observer.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbObserverData => {
        if (!dbObserverData) {
            res.status(400).json({ message: 'No observer with that email address!' });
            return;
        }

        const validPassword = dbObserverData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.observer_id = dbObserverData.id;
            req.session.observer_name = dbObserverData.observer_name;
            req.session.loggedIn = true;

            res.json({ observer: dbObserverData, message: 'You are now logged in!' });
        });
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {
    Observer.update(req.body, {
        individualHooks: true,
        where: {
            observer_id: req.params.id
        }
    })
        .then(dbObserverData => {
            if (!dbObserverData) {
                res.status(404).json({ message: 'No observer found with this id' });
                return;
            }
            res.json(dbObserverData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Observer.destroy({
        where: {
            observer_id: req.params.id
        }
    })
        .then(dbObserverData => {
            if (!dbObserverData) {
                res.status(404).json({ message: 'No observer found with this id' });
                return;
            }
            res.json(dbObserverData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
