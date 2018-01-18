let chai = require('chai');
let chaiHttp = require('chai-http');
let httpStatus = require('http-status');

let server = require('../dist/index');
let should = chai.should();

chai.use(chaiHttp);


describe('/POST any', () => {
    it('it should fail on not found routes  because of not found route', (done) => {
        chai.request(server)
            .post('/api/xxxx')
            .send({
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('status').eql(404);
                res.body.should.have.property('statusText').eql("Internal Error");
                res.body.should.have.property('message').eql("Not Found");
                done();
            });
    });
});


describe('/POST insert message', () => {
    it('it should successfully insert message to specified location', (done) => {
        chai.request(server)
            .post('/api/geolocation/insertmessage')
            .send({
                latitude: "51.232323",
                longitude: "51.232323",
                message: 'test message'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql(200);
                res.body.should.have.property('statusText').eql("OK");
                res.body.should.have.property('message').eql("Successfully inserted message");
                done();
            });
    });
});



describe('/GET insert message', () => {
    it('it should faild insert message to specified location  because of not found route ', (done) => {
        chai.request(server)
            .get('/api/geolocation/insertmessage')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('status').eql(404);
                res.body.should.have.property('statusText').eql("Internal Error");
                res.body.should.have.property('message').eql("Not Found");
                done();
            });
    });
});



describe('/POST insertmessage', () => {
    it('it should fail inserting message to specified location because of validation error', (done) => {
        chai.request(server)
            .post('/api/geolocation/insertmessage')
            .send({
                latitude: 51.232323,
                longitude: "51.232323",
                message: 'test message'
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('status').eql(400);
                res.body.should.have.property('statusText').eql("Bad Request");
                res.body.should.have.property('message').eql("validation error . \"latitude\" must be a string");
                done();
            });
    });



    describe('/POST insertmessage', () => {
        it('it should fail inserting message to specified location  because of validation error', (done) => {
            chai.request(server)
                .post('/api/geolocation/insertmessage')
                .send({
                    latitude: "51.232323",
                    longitude: "51.232323",
                    message: ''
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('statusText').eql("Bad Request");
                    res.body.should.have.property('message').eql("validation error . \"message\" is not allowed to be empty");
                    done();
                });
        });
    });



    describe('/POST getmessagesinradius', () => {
        it('it should successfully get messages in radius', (done) => {
            chai.request(server)
                .post('/api/geolocation/getmessagesinradius')
                .send({
                    latitude: "51.232323",
                    longitude: "51.232323",
                    radius: "500"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql(200);
                    res.body.should.have.property('statusText').eql("OK");
                    res.body.should.have.property('message').contains("Successfully get messages in");
                    res.body.should.have.property('data').should.be.a('object');;
                    done();
                });
        });


    });



    describe('/POST getmessagesinradius', () => {
        it('it should fail on get messages in radius  because of validation error', (done) => {
            chai.request(server)
                .post('/api/geolocation/getmessagesinradius')
                .send({
                    latitude: "51.232323",
                    longitude: "51.232323",
                    radius: "XXXXXXXX"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('statusText').eql("Bad Request");
                    res.body.should.have.property('message').eql("validation error . \"radius\" must be a number");
                    done();
                });
        });
    });



    describe('/POST getmessagesinradius', () => {
        it('it should fail on get messages in radius because of validation error', (done) => {
            chai.request(server)
                .post('/api/geolocation/getmessagesinradius')
                .send({
                    latitude: "5100000000000000",
                    longitude: "51.232323",
                    radius: "500"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('statusText').eql("Bad Request");
                    res.body.should.have.property('message').contains("validation error . \"latitude\" with value \"5100000000000000\" fails to match the required pattern:");
                    done();
                });
        });
    });



    describe('/POST getclosestmessage', () => {
        it('it should successfuly get closest message ', (done) => {
            chai.request(server)
                .post('/api/geolocation/getclosestmessage')
                .send({
                    latitude: "51.232323",
                    longitude: "51.232323",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql(200);
                    res.body.should.have.property('statusText').eql("OK");
                    res.body.should.have.property('message').eql("Successfully get closest message");
                    res.body.should.have.property('data').should.be.a('object');;
                    done();
                });
        });
    });


    describe('/POST getclosestmessage', () => {
        it('it should fail to get closest message validation error  because of validation error ', (done) => {
            chai.request(server)
                .post('/api/geolocation/getclosestmessage')
                .send({
                    latitude: "51.232323",
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('status').eql(400);
                    res.body.should.have.property('statusText').eql("Bad Request");
                    res.body.should.have.property('message').eql("validation error . \"longitude\" is required");
                    done();
                });
        });
    });

});