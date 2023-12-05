const router = require('express').Router();

const redirectController = require('../controllers/redirectController');



router.get('/:code', redirectController.redirectToOriginal)

module.exports = router;