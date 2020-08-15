const logger = require('../loaders/logger');
const { Company } = require('../models');

const CompanyController = {
  /**
    * @endpoint: POST /companies
    * @description: Create a company
  **/
  async create(req, res) {
    const body = req.body.company;

    try {
      if(!body) { throw 'Object "company" must be sent'; }
      if(!body.name) { throw 'Missing name attribute'; }

      const company = await Company.create(body);

      return res.created({ company });
    } catch(e) {
      logger.error(`CompanyController :: create\n${e}`);
      return res.badRequest(e);
    }
  }
};

module.exports = CompanyController;
