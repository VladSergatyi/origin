let mongoose = require("mongoose");
let user = require('./../config/mongoose');

let server = require('./../app');
let chai = require('chai');
let should = chai.should();
let chaiHttp = require('chai-http');

chai.use(chaiHttp);
    describe('test', () => {


      it('test login', (done) => {
        let user = {
          login: 'admin',
          password: '123456'
        }
        chai.request(server)
        .post('/login')
        .send(user)
        .end((err, res) => {

          res.status.should.equal(200);
          res.body.should.be.a('object');
           res.body.user.should.have.property('title');

          done()
        })
      })
    });
