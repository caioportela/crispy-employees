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

        should(res.text).be.equal('Missing company object');
        done();
      });
    });

    it('Should fail to create company without a name', (done) => {
      request.post('/companies')
      .send({ company: {} })
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Missing company name attribute');
        done();
      });
    });

    it('Should fail to create company without a user', (done) => {
      request.post('/companies')
      .send({ company: { name: 'Google' } })
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Missing user object');
        done();
      });
    });

    it('Should fail to create company without a user name', (done) => {
      request.post('/companies')
      .send({
        company: { name: 'Google' },
        user: { }
      })
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Missing name attribute');
        done();
      });
    });

    it('Should fail to create company without a password', (done) => {
      request.post('/companies')
      .send({
        company: { name: 'Google' },
        user: {
          name: 'Spencer Sotelo',
        }
      })
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Missing password attribute');
        done();
      });
    });

    it('Should fail to create company without a username', (done) => {
      request.post('/companies')
      .send({
        company: { name: 'Google' },
        user: {
          name: 'Spencer Sotelo',
          password: '123'
        }
      })
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Missing username attribute');
        done();
      });
    });

    it('Return a created company', (done) => {
      request.post('/companies')
      .send({
        company: { name: 'Google' },
        user: {
          name: 'Spencer Sotelo',
          username: 'spencerstl',
          password: 'Periphery#',
        }
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if(err) { return done(err); }

        should.exist(res.body.token);

        should.exist(res.body.company);
        should.exist(res.body.company.id);

        should.exist(res.body.user);
        should.exist(res.body.user.id);

        done();
      });
    });
  });
});
