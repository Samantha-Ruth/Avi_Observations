const router = require("express").Router();
const sequelize = require("../config/connection");
const { Observations, Observer, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Get all Observations entered by logged-in Observer
router.get("/", (req, res) => {
  console.log(req.session);
  console.log("!!!!!!!!!!!!!!!!!!!!");
  Observations.findAll({
    where: {
      observer_id: req.session.observer_id,
    },
    attributes: [
      "observations_id",
      "observations_name",
      "created_at",
    ],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "observations_id",
          "observer_id",
          "created_at",
        ],
        include: {
          model: Observer,
          attributes: ["observer_name", "observer_location", "email"],
        },
      },
      {
        model: Observer,
        attributes: ["observer_name", "observer_location", "email"],
      },
    ],
  })
          .then(dbObservationsData => {
            const observations = dbObservationsData.map(observations => observations.get({ plain: true }));
            res.render('dashboard', { observations, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', (req, res) => {
    Observations.findByPk(req.params.id, {
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
                    attributes: ['observer_name', 'observer_location', 'email']
                }
            },
            {
                model: Observer,
                attributes: ['observer_name','email']
            }
        ]
    })
        .then(dbObservationsData => {
            if (dbObservationsData) {
                const observations = dbObservationsData.get({ plain: true });

                res.render('edit-observations', {
                    observations,
                    loggedIn: true
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
