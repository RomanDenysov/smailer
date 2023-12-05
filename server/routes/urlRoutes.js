const router = require('express').Router();

const {body} = require('express-validator');

const urlController = require('../controllers/urlController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware)

router.post('/create',
    body('originalUrl').isURL().notEmpty(),
    urlController.createUrl)
router.delete('/remove/:id', urlController.removeUrl)
router.get('/geturls', urlController.getAllUrl)

module.exports = router;