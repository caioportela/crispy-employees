const { DataTypes, Model } = require('sequelize');

class Company extends Model {
  static init(sequelize){
    return super.init({
      name: { type: DataTypes.STRING, allowNull: false, },
    },{
      sequelize,
      paranoid: true,
      tableName: 'company',

      defaultScope: {
        // Remove attributes from default query
        // https://sequelize.org/master/manual/scopes.html
        attributes: {
          exclude: ['deletedAt']
        },
      },
    });
  }
}

module.exports = Company;
