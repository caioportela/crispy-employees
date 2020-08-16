const logger = require('../loaders/logger');
const { Company, User } = require('../models');

const CompanyController = {
  /**
    * @endpoint: POST /companies
    * @description: Creates a company and an user; and sign in the application
  **/
  async create(req, res) {
    let body = req.body;

    try {
      if(!body.company) { throw 'Missing company object'; }
      if(!body.company.name) { throw 'Missing company name attribute'; }

      if(!body.user) { throw 'Missing user object'; }
      if(!body.user.name) { throw 'Missing name attribute'; }
      if(!body.user.password) { throw 'Missing password attribute'; }
      if(!body.user.username) { throw 'Missing username attribute'; }

      const company = await Company.create(body.company);

      let user = await User.create({
        ...body.user,
        admin: true,
        company: company.id,
      });

      const token = user.generateToken(body.user.password);

      user = user.get({ plain: true });
      delete user.password;

      return res.created({ company, token, user });
    } catch(e) {
      logger.error(`CompanyController :: create\n${e}`);
      return res.badRequest(e);
    }
  }
};

module.exports = CompanyController;
