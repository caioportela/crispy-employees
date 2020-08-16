const server = require('../../../server');
const request = require('supertest')(server);
const should = require('should/as-function');

describe('Integration | Controller | User Controller', () => {
  describe('POST /users', () => {
    it('Should fail to create without user', (done) => {
      request.post('/users')
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Object "user" must be sent');
        done();
      });
    });

    it('Should fail to create user without name', (done) => {
      request.post('/users')
      .send({ user: {} })
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Missing name attribute');
        done();
      });
    });

    it('Should fail to create user without password', (done) => {
      request.post('/users')
      .send({
        user: { name: 'Matt Bellamy' },
      })
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Missing password attribute');
        done();
      });
    });

    it('Should fail to create user without username', (done) => {
      request.post('/users')
      .send({
        user: {
          name: 'Matt Bellamy',
          password: '123456',
        }
      })
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Missing username attribute');
        done();
      });
    });

    it('Should fail to create user without company', (done) => {
      request.post('/users')
      .send({
        user: {
          name: 'Matt Bellamy',
          password: '123456',
          username: 'matt.bellamy',
        }
      })
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Missing company attribute');
        done();
      });
    });

    it('Return a created user', (done) => {
      const data = {
        company: 1,
        name: 'Misha Mansoor',
        password: '123456',
        username: 'misha',
      };

      request.post('/users').send({ user: data })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if(err) { return done(err); }

        should.exist(res.body.user);
        should.exist(res.body.user.id);

        done();
      });
    });
  });

  describe('POST /users/signin', () => {
    it('Should fail to sign in without username', (done) => {
      request.post('/users/signin')
      .expect(401)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Missing username attribute');
        done();
      });
    });

    it('Should fail to sign in without password', (done) => {
      request.post('/users/signin')
      .send({ username: 'spncr' })
      .expect(401)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Missing password attribute');
        done();
      });
    });

    it('Should fail to sign in with invalid password', (done) => {
      request.post('/users/signin')
      .send({ password: '123', username: 'misha' })
      .expect(401)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Invalid username or password');
        done();
      });
    });

    it('Returns a token for authentication', (done) => {
      request.post('/users/signin')
      .send({ password: '123456', username: 'misha' })
      .expect(200)
      .end((err, res) => {
        if(err) { return done(err); }

        should.exist(res.body.company);
        should.exist(res.body.token);
        should.exist(res.body.user);

        done();
      });
    });
  });
});
