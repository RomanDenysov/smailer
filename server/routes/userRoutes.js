const router = require('express').Router();

const {body} = require('express-validator');

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 5, max: 32}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', )
router.get('/refresh', userController.refresh)
router.get('/users', )

module.exports = router;