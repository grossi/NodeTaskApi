//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Task = require('../models/task.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();


chai.use(chaiHttp);

describe('Tasks', () => {
    beforeEach((done) => { // Empty the database
        Task.deleteMany({}, (err) => { 
           done();           
        });        
    });
/* Test /GET route */
  describe('/GET tasks', () => {
      it('it should GET all the tasks', (done) => {
        chai.request(server)
            .get('/api/tasks')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});
