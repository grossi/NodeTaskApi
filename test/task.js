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

/* Test /POST route */
  describe('/POST tasks', () => {
      it('it should not POST a task without name field', (done) => {
          let task = {
              completed: false
          };
        chai.request(server)
            .post('/api/tasks')
            .send(task)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
              done();
            });
      });

      it('it should POST a task ', (done) => {
          let task = {
              name: "Create tests for the api",
              completed: false,
          }
        chai.request(server)
            .post('/api/tasks')
            .send(task)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.should.have.property('_id');
                  res.body.should.have.property('name');
                  res.body.should.have.property('completed');
              done();
            });
      });

  });

});
