const erpress = require('express');
const router = erpress.Router();
const authController = require('../controllers/auth.controller');
const { registerValidation, loginValidation } = require('../validators/auth.validator');
const { validate } = require("../middlewars/validate.middleware");
const getMe = require('../services/auth.service').getMe;


router.post('/signup', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.get('/me', getMe);

module.exports = router;
