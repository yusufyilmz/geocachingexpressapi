import geolocationDb from '../data/geolocation';
import geolib from 'geolib';
import _ from 'lodash';

function insertMessage(req, res, next) {
    geolocationDb.insert(req.body, (result) => {
        res.status(200)
            .json({
                status: 200,
                statusText: "OK",
                message: "Successfully inserted message",
            });
    }, (error) => next(error));
}



function getMessagesInRadius(req, res, next) {

    let targetLatitude = req.body.latitude;
    let targetLongitude = req.body.longitude;
    let radius = req.body.radius;

    geolocationDb.get((result) => {

        var messagesInRadius = result.filter((point) => {
            return geolib.isPointInCircle(
                { latitude: point.latitude, longitude: point.longitude },
                { latitude: targetLatitude, longitude: targetLongitude },
                radius * 1000)
        });

        let resultMessage = messagesInRadius.length > 0 ?
            `Successfully get messages in ${req.body.radius} km` :
            `No message found in ${req.body.radius} km`


        res.status(200)
            .json({
                status: 200,
                statusText: "OK",
                message: resultMessage,
                data: messagesInRadius.map((message) => {
                    return _.omit(message, "id")
                })
            });
    }, (error) => next(error));
}


function getClosestMessage(req, res, next) {

    let targetLatitude = req.body.latitude;
    let targetLongitude = req.body.longitude;

    geolocationDb.get((result) => {

        var closestMessage = result.reduce((accumulator, current) => {
            let distance = geolib.getDistance(
                { latitude: current.latitude, longitude: current.longitude },
                { latitude: targetLatitude, longitude: targetLongitude }, 100
            );

            return accumulator.distance < distance ? accumulator : current
        }, {});

        let resultMessage = isEmpty(closestMessage) ?
            `No message found` :
            `Successfully get closest message`

        res.status(200)
            .json({
                status: 200,
                statusText: "OK",
                message: resultMessage,
                data: _.omit(closestMessage, 'id'),
            });

    }, (error) => next(error));
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}


export default { getMessagesInRadius, insertMessage, getClosestMessage }
