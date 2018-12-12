var app = require("../index");
const chai = require('chai');
var expect = chai.expect;
const should = chai.should();
var chaiHttp = require("chai-http");
var sinon = require("sinon"); //stubbing, get responce from stub instead of server 
const request = require('request');
//Use to compare objects
const transform = require('lodash').transform;
const isEqual = require('lodash').isEqual;
const isObject = require('lodash').isObject;

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
function difference(object, base) {
	return transform(object, (result, value, key) => {
		if (!isEqual(value, base[key])) {
			result[key] = isObject(value) && isObject(base[key]) ? difference(value, base[key]) : value;
		}
	});
}


//=============
const base = 'https://elena-mohsena-group-project.herokuapp.com';

describe('patients_api', () => {

  describe('Integration test [not stubbed]', () => {
    // test cases

    describe('GET /patients/:id', () => {
        it('Status code should be 200', (done) => {
            request.get(`${base}/patients/5c0e88b245aefe0016828deb`, (err, res, body) => {
                // there should be a 200 status code
                res.statusCode.should.eql(200);
                done();
            });
        });

        it('Content type should be application/json', (done) => {
            request.get(`${base}/patients/5c0e88b245aefe0016828deb`, (err, res, body) => {

                // the response should be JSON
                res.headers['content-type'].should.contain('application/json');
                done();
            });
        });

        it('Content type should return proper response', (done) => {
            request.get(`${base}/patients/5c0e88b245aefe0016828deb`, (err, res, body) => {
              
                // parse response body
                body = JSON.parse(body);
                var patient = require('./fixtures/patient_5c0e88b245aefe0016828deb.json');
                body.should.eql(patient);
                done();
            });
        });

      });

  });


  var responseObject, responseBody;

  describe('Unit test [stubbed]', () => {
    //Set stubb
    beforeEach(() => {
      responseObject = {
        statusCode: 200,
        headers: {
          'content-type': 'application/json'
        }
      };
      responseBody = 
      {
        "_id": "5c0e88b245aefe0016828deb",
        "photo": "photo_1",
        "patient_firstName": "John",
        "patient_lastName": "Carr",
        "patient_dateOfBirth": "1993-12-10",
        "patient_gender": "female",
        "patient_address": "654 Cosburn Ave.",
        "patient_city": "Montreal",
        "patient_province": "Quebec",
        "patient_postalCode": "K8F 4S1",
        "patient_e_mail": "peter@gmail.com",
        "patient_phoneNumber": "765 324 5676",
        "patient_doctorID": "5c0e836c45aefe0016828de9"
    }
        this.get = sinon.stub(request, 'get');
    });
  // After each test restore req , 
    afterEach(() => {
      request.get.restore();
    });

    describe('GET /patients/:id', () => {
      it('Status code should be 200', (done) => {
        this.get.yields(null, responseObject, JSON.stringify(responseBody));
        request.get(`${base}/patients/5c0e88b245aefe0016828deb`, (err, res, body) => {
          // there should be a 200 status code
          res.statusCode.should.eql(200);
          done();
        });
      });
    });

    describe('GET /patients/:id', () => {
        it('Content type should be application/json', (done) => {
          this.get.yields(null, responseObject, JSON.stringify(responseBody));
          request.get(`${base}/patients/5c0e88b245aefe0016828deb`, (err, res, body) => {
            // the response should be JSON
            res.headers['content-type'].should.contain('application/json');
            done();
          });
        });
      });

      describe('GET /patients/:id', () => {
        it('Content type should return proper response', (done) => {
          this.get.yields(null, responseObject, JSON.stringify(responseBody));
          request.get(`${base}/patients/5c0e88b245aefe0016828deb`, (err, res, body) => {
            // parse response body
            var patient = require('./fixtures/patient_5c0e88b245aefe0016828deb.json');
            body = JSON.parse(body);
            body.should.eql(patient);
            done();
          });
        });
      });

  });
});