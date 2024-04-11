var express = require('express')
var router = express.Router();

var UserController = require('../controllers/userController');
var BookingController = require('../controllers/controller');

router.post('/getUser', UserController.getUserDetails);

router.get('/getUserById/:email',UserController.getUserDetailsById);

router.post('/postNewUser', UserController.postNewUserDetails);

router.put('/updateUser', UserController.updateUserDetails);

router.get('/getBookingById/:id',BookingController.getBookingDetailsById);

router.get('/getBookingDetails/:email', BookingController.getBookingDetails);

router.post('/postNewBooking', BookingController.postNewBookingDetails);

router.put('/updateBooking/:id', BookingController.updateBookingDetails);

router.delete('/deleteBooking/:id', BookingController.deleteBooking);

module.exports = router;


module.exports = router;