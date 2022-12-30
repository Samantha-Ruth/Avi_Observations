const router = require('express').Router();

const observerRoutes = require('./observer-routes.js');
const observationsRoutes = require('./observations-routes');
const commentRoutes = require('./comment-routes');

router.use('/observers', observerRoutes);
router.use('/observations', observationsRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
