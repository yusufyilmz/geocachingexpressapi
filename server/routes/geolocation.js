import express from 'express';
import validate from 'express-validation';
import validations from '../validation';
import geolocationController from '../controller/geolocation';

const router = express.Router();

router.route('/insertmessage').
    post(validate(validations.locationWithMessage), geolocationController.insertMessage)

router.route('/getmessagesinradius').
    post(validate(validations.closeMessages), geolocationController.getMessagesInRadius)

router.route('/getclosestmessage').
    post(validate(validations.closestMessage), geolocationController.getClosestMessage)

export default router;
