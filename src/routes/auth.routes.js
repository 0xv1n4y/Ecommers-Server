const erpress = require('express');
const router = erpress.Router();
const authController = require('../controllers/auth.controller');
const { registerValidation, loginValidation } = require('../validators/auth.validator');
const { validate } = require("../middlewars/validate.middleware");


router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);

module.exports = router;
