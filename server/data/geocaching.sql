DROP DATABASE IF EXISTS geocaching;
CREATE DATABASE geocaching;

\c geocaching;

CREATE TABLE geolocation (
  id SERIAL PRIMARY KEY,
  message VARCHAR,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION
);

