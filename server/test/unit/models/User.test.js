const should = require('should/as-function');
const bcrypt = require('bcrypt');
const { User } = require('../../../src/models');

describe('Unit | Model | User', () => {
  const data = {
    company: 1,
    name: 'Matt Bellamy',
    password: '123456',
    username: 'matt.bellamy',
  };

  it('Cannot create an user without data', async () => {
    try {
      await User.create();
    } catch(validationError) {
      should.exist(validationError.errors);

      const errors = validationError.errors;

      should(errors[0].message).be.equal('User.name cannot be null');
      should(errors[1].message).be.equal('User.password cannot be null');
      should(errors[2].message).be.equal('User.username cannot be null');
      should(errors[3].message).be.equal('User.company cannot be null');
    }
  });

  it('Creates an user instance', async () => {
    const user = await User.create(data);

    should(user).be.instanceof(User);
    should(user.name).be.equal(data.name);
    should(user.username).be.equal(data.username);

    should(bcrypt.compareSync(data.password, user.password)).be.true();
  });

  it('Cannot create user with duplicate username', async () => {
    try {
      await User.create(data);
    } catch(validationError) {
      should.exist(validationError.errors);
      should(validationError.errors[0].message).be.equal('username must be unique');
    }
  });
});
