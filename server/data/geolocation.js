import PGP from 'pg-promise';
import Promise from 'bluebird';
import config from '../config';

const pgp = PGP({ promiseLib: Promise });
const db = pgp(config.db);

function get(success, error) {

    db.any('SELECT * from geolocation')
        .then((result) => {
            success(result)
        })
        .catch((err) => {
            error(err)
        });
}

function insert(data, success, error) {
    db.any(`INSERT INTO geolocation (message, latitude, longitude) VALUES ('${data.message}', ${data.latitude}, ${data.longitude})`)
        .then((result) => {
            success(result)
        })
        .catch((err) => {
            error(err)
        });
}

export default { get, insert }
