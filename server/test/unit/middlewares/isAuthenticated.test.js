const should = require('should/as-function');
const jwt = require('../../../src/utils/JWT');
const { User } = require('../../../src/models');

const {
  getToken,
  getUser,
} = require('../../../src/middlewares/isAuthenticated');

describe('Unit | Middleware | isAuthenticated', () => {
  const data = { user: 1 };
  const credentials = jwt.sign(data);

  describe('Function: getToken', () => {
    it('Should fail to return token', () => {
      try {
        getToken();
      } catch(e) {
        should(e).be.equal('Authorization credentials not informed');
      }
    });

    it('Returns token from headers', () => {
      const authorization = `Bearer ${credentials}`;

      const token = getToken(authorization);
      should(token).be.equal(credentials);
    });
  });

  describe('Function: getUser', () => {
    it('Should fail with invalid token', async () => {
      const token = jwt.sign({ company: 1 });

      try {
        await getUser(token);
      } catch(e) {
        should(e).be.equal('Invalid token');
      }
    });

    it('Should fail with invalid user', async () => {
      const token = jwt.sign({ user: 1000 });

      try {
        await getUser(token);
      } catch(e) {
        should(e).be.equal('User not found');
      }
    });

    it('Returns user from token', async () => {
      const user = await getUser(credentials);
      should(user).be.instanceof(User);
    });
  });
});
