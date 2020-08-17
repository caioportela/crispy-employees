const server = require('../../../server');
const request = require('supertest')(server);
const should = require('should/as-function');

describe('Integration | Controller | User Controller', () => {
  let authorization;
  const data = {
    company: 1,
    name: 'Simone Simons',
    password: '123',
    username: 'simone.simons',
  };

  before((done) => {
    request.post('/users/signin')
    .send({
      username: 'spencerstl',
      password: 'Periphery#'
    })
    .expect(200)
    .end((err, res) => {
      if(err) { return done(err); }
      authorization = `Bearer ${res.body.token}`;

      done();
    });
  });

  describe('POST /users', () => {
    it('Should fail without authentication', () => {
      return request.post('/users').expect(401);
    });

    it('Should fail to create without user', (done) => {
      request.post('/users')
      .set('Authorization', authorization)
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Object "user" must be sent');
        done();
      });
    });

    it('Should fail to create user without name', (done) => {
      request.post('/users')
      .set('Authorization', authorization)
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
      .set('Authorization', authorization)
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
      .set('Authorization', authorization)
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

    it('Return a created user', (done) => {
      request.post('/users').send({ user: data })
      .set('Authorization', authorization)
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

  describe('GET /users', () => {
    it('Returns a list of all users from company', (done) => {
      request.get('/users')
      .set('Authorization', authorization)
      .expect(200)
      .end((err, res) => {
        if(err) { return done(err); }

        should.exist(res.body.users);
        should(res.body.users).be.Array();

        done();
      });
    });

    it('Returns a list of users with filter', (done) => {
      const term = 'sot';

      request.get(`/users?term=${term}`)
      .set('Authorization', authorization)
      .expect(200)
      .end((err, res) => {
        if(err) { return done(err); }

        should.exist(res.body.users);
        const { users } = res.body;

        should(users).be.Array();
        users.forEach((user) => {
          const name = user.name.toLowerCase();
          should(name).containEql(term);
        });

        done();
      });
    });
  });

  describe('GET /users/:id', () => {
    it('Should fail to find user', (done) => {
      request.get('/users/2000')
      .set('Authorization', authorization)
      .expect(404)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('User not found');

        done();
      });
    });

    it('Returns a user by id', (done) => {
      request.get('/users/2')
      .set('Authorization', authorization)
      .expect(200)
      .end((err, res) => {
        if(err) { return done(err); }

        should.exist(res.body.user);

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

    it('Should fail to sign in with invalid username', (done) => {
      request.post('/users/signin')
      .send({ password: '123', username: 'dom' })
      .expect(401)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Invalid username or password');
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
      .send({ password: data.password, username: data.username })
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

  let notAdmin;
  describe('PUT /users/:id', () => {
    before((done) => {
      request.post('/users/signin')
      .send({
        username: data.username,
        password: data.password,
      })
      .expect(200)
      .end((err, res) => {
        if(err) { return done(err); }

        notAdmin = res.body;

        done();
      });
    });

    it('Should fail to update without permission', (done) => {
      request.put('/users/1')
      .set('Authorization', `Bearer ${notAdmin.token}`)
      .expect(403)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Permission denied');

        done();
      });
    });

    it('Should fail to update without user', (done) => {
      request.put('/users/1')
      .set('Authorization', authorization)
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Object "user" must be sent');
        done();
      });
    });

    it('Should fail to update user without name', (done) => {
      request.put('/users/1')
      .set('Authorization', authorization)
      .send({ user: {} })
      .expect(400)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Missing name attribute');
        done();
      });
    });

    it('Should fail to update user without username', (done) => {
      request.put('/users/1')
      .set('Authorization', authorization)
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

    it('Should fail to update invalid user', (done) => {
      request.put('/users/3000')
      .send({ user: data })
      .set('Authorization', authorization)
      .expect(404)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('User not found');

        done();
      });
    });

    it('Returns the updated user', (done) => {
      request.put('/users/1')
      .send({ user: { name: 'Corey Taylor', username: 'username' } })
      .set('Authorization', authorization)
      .expect(200)
      .end((err, res) => {
        if(err) { return done(err); }

        should.exist(res.body.user);
        should(res.body.user.name).be.equal('Corey Taylor');

        done();
      });
    });
  });

  describe('DELETE /users/:id', () => {
    it('Should fail to delete without permission', (done) => {
      request.delete('/users/1')
      .set('Authorization', `Bearer ${notAdmin.token}`)
      .expect(403)
      .end((err, res) => {
        if(err) { return done(err); }

        should(res.text).be.equal('Permission denied');

        done();
      });
    });

    it('Remove user by id', () => {
      return request.delete('/users/3')
      .set('Authorization', authorization)
      .expect(204);
    });
  });
});
