Geocaching service

A node.js express geocaching api project.

#   Getting Started

#   Requirement:

Postgres is necessary for data storing.

#   Installing:

Install the required packages with that command at project directory:

    npm install 

To create database run that command at project directory if you have already installed postgres. If not please install postgres first.

    npm run create-db

#   Start:

To start and debug project run that that command at project directory:

     npm start 

Builds project to /dist folder and runs api in development mode. Open http://localhost:3000 to view it in the browser. 

#   Test:

There are several test cases for components and reducers. To run test cases, run that command at project directory:

     npm test

#   Deployment:

To prepare a deployment of project, run that command at project directory:

     npm run build

#   Code Overview

#   Dependencies:

expressjs - The server for handling and routing HTTP requests
geolib - to find distances between locations and find if location in a circle
express-validation - to validate post requests
joi - to write validation rules 
pg, pg-promise, bluebird-  For modeling and mapping postgres data 
body-parser - to parse json requests
babel * - to use es6 in node.js 
mocha, chai, and sinon: packages that are used to write test cases                      

#   Features:

Insert messages to specific locations with latitude and longitude
Get close messages within a given radius(km) around a certain position with latitude and longitude
Get the closest message to a certain position  with latitude and longitude

#   Application Structure:

app.js -  this file defines our express server and  requires the routes we'll be using in the application. The entry point to our application.
config/ -  configuration variables for our server are contained in this folder
routes/ -  the route definitions for our API are contained in this folder
controller/ - Controllers that handle requests with data are contained in this folder
data/ -  the schema definitions for our postgres models are contained in this folder
validation/ -  validation rules for our post requests are contained in this folder

#   API

## Insert secret message  [POST] [/api/geolocation/insertmessage]

Insert messages to specific locations with latitude and longitude

+ Request (application/json)

        {
            "latitude": "55.5555",
            "longitude": "55.5555",
            "message": "secret message"
        }
        
+ Response 200 (application/json)

        
            {
                "status": 200,
                "statusText": "OK",
                 "message": "Successfully inserted message"
            }
       
+ Response 400 (application/json)

            {
                "status": 400,
                "statusText": "Bad Request",
                 "message": "validation error . \"longitude\" must be a string"
            }
       
+ Response 404 (application/json)

            {
                "status": 404,
                "statusText": "Internal Error",
                "message": "..."
            }
            
## Get messages in radius [POST] [/api/geolocation/getmessagesinradius]

Get close messages within a given radius(km) around a certain position with latitude and longitude

+ Request (application/json)

        {
            "latitude": "55.5555",
            "longitude": "55.5555",
            "radius": 500
        }
        
+ Response 200 (application/json)

            {
                "status": 200,
                "statusText": "OK",
                "message": "Successfully get messages in 500 km",
                "data": [
                    {
                        "message": "test message",
                        "latitude": 51.232323,
                        "longitude": 51.232323
                    }, {
                        "message": "test message 2",
                        "latitude": 52.232323,
                        "longitude": 53.232323
                    }
                ]
            }
       
+ Response 200 (application/json)

            {
                "status": 200,
                "statusText": "OK",
                "message": "No message found in 500 km",
                "data": [ ]
            }

+ Response 400 (application/json)

            {
                "status": 400,
                "statusText": "Bad Request",
                "message": "validation error . \"longitude\" must be a string"
            }
       
+ Response 404 (application/json)

            {
                "status": 404,
                "statusText": "Internal Error",
                "message": "..."
            }
            
          
## Get closest message  [POST] [/api/geolocation/getclosestmessage]

Get the closest message to a certain position  with latitude and longitude

+ Request (application/json)

        {
            "latitude": "55.5555",
            "longitude": "55.5555"
        }
        
+ Response 200 (application/json)

            {
                "status": 200,
                "statusText": "OK",
                "message": "Successfully get closest message",
                "data": 
                    {
                        "message": "test message",
                        "latitude": 51.232323,
                        "longitude": 51.232323
                    }
            }

+ Response 200 (application/json)

            {
                "status": 200,
                "statusText": "OK",
                "message": "No message found",
                "data": {}
            }

+ Response 400 (application/json)

            {
                "status": 400,
                "statusText": "Bad Request",
                "message": "validation error . \"longitude\" must be a string"
            }
       
+ Response 404 (application/json)

            {
                "status": 404,
                "statusText": "Internal Error",
                "message": "..."
            }
            


#   License

This project is licensed under the MIT License 

#   Authors

Yusuf Yılmaz
