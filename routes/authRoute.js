const erpress = require('express');
const router = erpress.Router();
const  Signup  = require('../controllers/usercontroller');    


// Signup route
router.post('/signup', Signup);

module.exports = router;
