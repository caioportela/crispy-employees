const logger = require('../loaders/logger');
const { Company, User } = require('../models');

const UserController = {
  /**
    * @endpoint: POST /users
    * @description: Create an user
  **/
  async create(req, res) {
    const body = req.body.user;

    try {
      // Check if company was sent
      if(!body) { throw 'Object "user" must be sent'; }

      // Check if all attributes were sent
      if(!body.name) { throw 'Missing name attribute'; }
      if(!body.password) { throw 'Missing password attribute'; }
      if(!body.username) { throw 'Missing username attribute'; }
      if(!body.company) { throw 'Missing company attribute'; }

      const user = await User.create(body);

      return res.created({ user });
    } catch (e) {
      logger.error(`UserController :: create\n${e}`);
      return res.badRequest(e);
    }
  },

  /**
    * @endpoint: POST /users/signin
    * @description: Sign in session
  **/
  async signin(req, res) {
    const { username, password } = req.body;

    try {
      if(!username) { throw 'Missing username attribute'; }
      if(!password) { throw 'Missing password attribute'; }

      const user = await User.findOne({
        where: { username }
      });

      const token = user.generateToken(password);
      if(!token) { throw 'Invalid username or password'; }

      const company = await Company.findOne({
        where: { id: user.company },
      });

      return res.ok({ company, token, user });
    } catch(e) {
      logger.error(`UserController :: signin\n${e}`);
      return res.unauthorized(e);
    }
  },
};

module.exports = UserController;
