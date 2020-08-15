const logger = require('../loaders/logger');
const { User } = require('../models');

const UserController = {
  /**
    * @endpoint: POST /companies
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
};

module.exports = UserController;
