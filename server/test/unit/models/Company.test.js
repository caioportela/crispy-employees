const should = require('should/as-function');
const { Company } = require('../../../src/models');

describe('Unit | Model | Company', () => {
  it('Cannot create a company without data', async () => {
    try {
      await Company.create();
    } catch(validationError) {
      should.exist(validationError.errors);

      const errors = validationError.errors;
      should(errors[0].message).be.equal('Company.name cannot be null');
    }
  });

  it('Creates a company instance', async () => {
    const data = { name: 'Google' };

    const company = await Company.create(data);

    should(company).be.instanceof(Company);
    should(company.name).be.equal(data.name);
  });
});
