const server = require('../../../server');
const request = require('supertest')(server);
const should = require('should/as-function');

describe('Integration | Controller | Company Controller', () => {
  describe('POST /companies', () => {
    it('Should fail to create without company', (done) => {
      request.post('/companies')
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Object "company" must be sent');
        done();
      });
    });

    it('Should fail to create company without name', (done) => {
      request.post('/companies')
      .send({ company: {} })
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Missing name attribute');
        done();
      });
    });

    it('Return a created company', (done) => {
      request.post('/companies')
      .send({ company: { name: 'Google' }})
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if(err) { return done(err); }

        should.exist(res.body.company);
        const company = res.body.company;

        should.exist(company.name);
        should(company.name).be.equal('Google');

        done();
      });
    });
  });
});
