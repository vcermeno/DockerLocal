// import request = require("../../node_modules/request")
const app = require('../../src/server/server');
const supertest = require('supertest');
const request = supertest(app);
 

// describe('')
// request(app)
//   .get('/user')
//   .expect('Content-Type', /json/)
//   .expect('Content-Length', '15')
//   .expect(200)
//   .end(function(err, res) {
//     if (err) throw err;
//   });